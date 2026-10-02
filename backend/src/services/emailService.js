import nodemailer from "nodemailer";
import { buildPaymentConfirmationEmail, POSTER_CID, POSTER_IMAGE_PATH } from "../templates/paymentConfirmationEmail.js";

const createMailer = () => {
  console.log("EMAIL_USER exists:", Boolean(process.env.EMAIL_USER));
  console.log("EMAIL_PASSWORD exists:", Boolean(process.env.EMAIL_PASSWORD));
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error("Email is not configured. Set EMAIL_USER and EMAIL_PASSWORD in the backend environment.");
  }
  return nodemailer.createTransport({ service: "gmail", auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD } });
};

const getRecipientEmail = (registration) => {
  const recipientEmail = registration?.leader?.email?.trim();
  console.log("Recipient Email:", recipientEmail || "(missing)");
  if (!recipientEmail) throw new Error("The team leader email is missing from this registration.");
  return recipientEmail;
};

export const sendConfirmationEmail = async (registration) => {
  const mailer = createMailer();
  const recipientEmail = getRecipientEmail(registration);
  await mailer.sendMail({
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: "DEXATHON 2026 Registration Confirmation",
    text: `DEXATHON 2026 Registration Successful\n\nTeam Name: ${registration.teamName}\nTeam ID: ${registration.teamId}\nRegistration Number: ${registration.registrationNumber}\nAmount Paid: ₹${registration.payment.amount}\nTransaction ID: ${registration.payment.transactionId}\nPayment Status: ${registration.payment.status}\nUPI ID: ${registration.payment.upiId || "Razorpay"}\nRegistration Date: ${registration.createdAt.toLocaleDateString()}`,
  });
};

export const sendPaymentConfirmationEmail = async (registration) => {
  const mailer = createMailer();
  const recipientEmail = getRecipientEmail(registration);

  await mailer.verify();

  const { html, text } = buildPaymentConfirmationEmail(registration);
  const result = await mailer.sendMail({
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: "DEXATHON 2026 — Payment Confirmed ✓",
    html,
    text,
    attachments: [{ filename: "dexathon-2026-poster.jpg", path: POSTER_IMAGE_PATH, cid: POSTER_CID }],
  });
  const accepted = result.accepted.map((address) => String(address).toLowerCase()).includes(recipientEmail.toLowerCase());
  if (accepted) console.log("Confirmation email sent successfully", { messageId: result.messageId, response: result.response });
  else console.error("Confirmation Email Error: recipient not accepted by SMTP server", { accepted: result.accepted, rejected: result.rejected, response: result.response });
  return accepted;
};

export const verifyEmailTransport = async () => {
  try {
    await createMailer().verify();
    console.log("SMTP server is ready");
  } catch (error) {
    console.error("SMTP verification failed:", error.code || "", error.responseCode || "", error.message);
  }
};
