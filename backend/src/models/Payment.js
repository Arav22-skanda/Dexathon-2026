import mongoose from "mongoose";

export default mongoose.model("Payment", new mongoose.Schema({ registration: { type: mongoose.Schema.Types.ObjectId, ref: "Registration" }, amount: Number, status: String, transactionId: String, orderId: String }, { timestamps: true }));
