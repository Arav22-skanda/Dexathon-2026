import { sendConfirmationEmail } from "../services/emailService.js";

export const sendRegistrationConfirmation = async (request, response) => {
  await sendConfirmationEmail(request.registration);
  return response.status(204).end();
};
