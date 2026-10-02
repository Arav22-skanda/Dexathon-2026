import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Registration from "../models/Registration.js";
import { sendPaymentConfirmationEmail } from "../services/emailService.js";

export const login = async (request, response) => {
  const { username, password } = request.body;
  const admin = await Admin.findOne({ username });
  if (!admin || !(await bcrypt.compare(password || "", admin.passwordHash))) {
    return response.status(401).json({ success: false, message: "Invalid username or password" });
  }
  return response.json({ success: true, token: jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: "8h" }), admin: { username: admin.username } });
};

export const getDashboard = async (_request, response) => {
  const registrations = await Registration.find();
  const successful = registrations.filter(({ payment }) => payment.status === "Successful" && payment.confirmedAt);
  return response.json({
    totalRegistrations: registrations.length,
    totalTeams: registrations.length,
    totalParticipants: registrations.reduce((total, item) => total + item.members.length, 0),
    totalFacultyRegistrations: registrations.filter((item) => item.mentor?.name).length,
    totalAmount: successful.reduce((total, item) => total + item.payment.amount, 0),
    successfulPayments: successful.length,
    pendingPayments: registrations.filter(({ payment }) => payment.status !== "Successful" && payment.status !== "Failed").length,
    failedPayments: registrations.filter(({ payment }) => payment.status === "Failed").length,
  });
};

export const getRegistrations = async (request, response) => {
  const search = request.query.search ? new RegExp(request.query.search, "i") : null;
  const filter = search ? { $or: [{ teamName: search }, { teamId: search }, { registrationNumber: search }, { "leader.name": search }, { "leader.email": search }, { college: search }, { "payment.transactionId": search }] } : {};
  return response.json(await Registration.find(filter).sort({ createdAt: -1 }));
};

export const getPayments = async (_request, response) => response.json(await Registration.find({}, "teamId teamName college leader payment createdAt").sort({ createdAt: -1 }));
export const getFaculty = async (_request, response) => response.json(await Registration.find({ "mentor.name": { $ne: "" } }, "mentor college teamName createdAt"));

const updateConfirmationEmailStatus = async (registration) => {
  try {
    console.log(`Starting payment confirmation email for ${registration._id} to ${registration.leader?.email || "missing recipient"}.`);
    const sent = await sendPaymentConfirmationEmail(registration);
    registration.payment.confirmationEmailStatus = sent ? "Sent" : "Failed";
    if (sent) registration.payment.confirmationEmailSentAt = new Date();
    await registration.save();
    console.log(`Payment confirmation email ${sent ? "sent" : "not accepted"} for ${registration._id}.`);
    return sent;
  } catch (error) {
    console.error("Confirmation Email Error:", error);
    console.error("Error details:", {
      registrationId: registration._id,
      recipient: registration.leader?.email || null,
      code: error.code || null,
      responseCode: error.responseCode || null,
      message: error.message,
    });
    registration.payment.confirmationEmailStatus = "Failed";
    await registration.save();
    return false;
  }
};

export const confirmPayment = async (request, response) => {
  const registration = await Registration.findById(request.params.id);
  if (!registration) return response.status(404).json({ message: "Registration not found." });
  if (registration.payment.confirmedAt) return response.json({ success: true, alreadyConfirmed: true, registration });
  if (!registration.payment.transactionId) return response.status(400).json({ message: "A transaction ID is required before confirming payment." });

  registration.payment.status = "Successful";
  registration.payment.confirmedAt = new Date();
  registration.payment.confirmedBy = request.admin.username;
  await registration.save();

  console.log(`Payment confirmed successfully for ${registration._id}.`);

  const emailSent = await updateConfirmationEmailStatus(registration);
  return response.json({
    success: true,
    paymentConfirmed: true,
    emailSent,
    message: emailSent ? "Payment confirmed and confirmation email sent." : "Payment confirmed, but confirmation email failed.",
    registration,
  });
};

export const resendPaymentConfirmationEmail = async (request, response) => {
  const registration = await Registration.findById(request.params.id);
  if (!registration) return response.status(404).json({ message: "Registration not found." });
  if (!registration.payment.confirmedAt) return response.status(400).json({ message: "Confirm the payment before sending its confirmation email." });

  const emailSent = await updateConfirmationEmailStatus(registration);
  return response.json({
    success: emailSent,
    paymentConfirmed: true,
    emailSent,
    message: emailSent ? "Confirmation email sent." : "Confirmation email could not be sent.",
    registration,
  });
};
