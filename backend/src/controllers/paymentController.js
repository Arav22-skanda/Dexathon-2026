import crypto from "crypto";
import Registration from "../models/Registration.js";
import { sendConfirmationEmail } from "../services/emailService.js";
import { createOrder } from "../services/paymentService.js";
import PaymentSettings from "../models/PaymentSettings.js";

export const createPaymentOrder = async (request, response) => {
  const registration = await Registration.findById(request.body.registrationId);
  if (!registration) return response.status(404).json({ message: "Registration not found." });
  if (!process.env.PAYMENT_KEY_ID || !process.env.PAYMENT_KEY_SECRET) {
    return response.status(503).json({ message: "Payments are not configured yet." });
  }

  const order = await createOrder(registration);
  registration.payment.orderId = order.id;
  await registration.save();
  return response.json({ order, keyId: process.env.PAYMENT_KEY_ID });
};

export const verifyPayment = async (request, response) => {
  const { registrationId, razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = request.body;
  if (!registrationId || !orderId || !paymentId || !signature) {
    return response.status(400).json({ message: "Incomplete payment verification details." });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.PAYMENT_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  if (!crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature))) {
    return response.status(400).json({ message: "Payment verification failed." });
  }

  const registration = await Registration.findOneAndUpdate(
    { _id: registrationId, "payment.orderId": orderId },
    { "payment.status": "Successful", "payment.paymentId": paymentId, "payment.transactionId": paymentId, "payment.paidAt": new Date() },
    { new: true },
  );
  if (!registration) return response.status(404).json({ message: "Matching payment order not found." });

  try {
    await sendConfirmationEmail(registration);
  } catch (error) {
    console.error("Registration confirmation email error:", error);
  }
  return response.json(registration);
};

export const recordUpiTransaction = async (request, response) => {
  const { registrationId } = request.body;
  const transactionId = typeof request.body.transactionId === "string" ? request.body.transactionId.trim() : "";
  if (!transactionId) return response.status(400).json({ success: false, message: "Transaction ID is required" });
  if (!registrationId) return response.status(400).json({ success: false, message: "Registration ID is required" });

  const settings = await PaymentSettings.findOne();
  if (!settings?.paymentEnabled || !settings.upiId) return response.status(400).json({ message: "UPI payments are currently unavailable." });

  const registration = await Registration.findByIdAndUpdate(
    registrationId,
    { "payment.transactionId": transactionId, "payment.upiId": settings.upiId, "payment.status": "Awaiting Verification" },
    { new: true },
  );
  if (!registration) return response.status(404).json({ message: "Registration not found." });
  return response.json({ message: "Transaction submitted for backend verification.", registration });
};
