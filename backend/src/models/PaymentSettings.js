import mongoose from "mongoose";

const paymentSettingsSchema = new mongoose.Schema({
  registrationAmount: { type: Number, min: 1, default: 300 },
  upiId: { type: String, trim: true, default: "" },
  upiName: { type: String, trim: true, default: "DEXATHON 2026" },
  paymentEnabled: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("PaymentSettings", paymentSettingsSchema);
