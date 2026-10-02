import PaymentSettings from "../models/PaymentSettings.js";

const defaultSettings = {
  registrationAmount: 300,
  upiId: "",
  upiName: "DEXATHON 2026",
  paymentEnabled: false,
};

const currentSettings = async () => {
  const settings = await PaymentSettings.findOne();
  if (settings) {
    if (settings.registrationAmount == null) {
      settings.registrationAmount = defaultSettings.registrationAmount;
      await settings.save();
    }
    return settings;
  }

  if (process.env.NODE_ENV === "production") return null;
  return PaymentSettings.create(defaultSettings);
};

export const getPaymentSettings = async (_request, response) => response.json((await currentSettings()) || defaultSettings);

export const updatePaymentSettings = async (request, response) => {
  const { registrationAmount, upiId, upiName, paymentEnabled } = request.body;
  const amount = Number(registrationAmount);
  const normalizedUpiId = typeof upiId === "string" ? upiId.trim() : "";
  const normalizedUpiName = typeof upiName === "string" ? upiName.trim() : "";

  if (!Number.isFinite(amount) || amount <= 0) {
    return response.status(400).json({ success: false, message: "Enter a valid registration amount." });
  }
  if (!normalizedUpiName) {
    return response.status(400).json({ success: false, message: "UPI display name is required." });
  }
  if (paymentEnabled === true && !normalizedUpiId) {
    return response.status(400).json({ success: false, message: "A UPI ID is required to enable payments." });
  }

  const settings = await PaymentSettings.findOneAndUpdate(
    {},
    {
      registrationAmount: amount,
      upiId: normalizedUpiId,
      upiName: normalizedUpiName,
      paymentEnabled: paymentEnabled === true,
    },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );
  return response.json({ success: true, message: "Payment settings updated successfully.", settings });
};
