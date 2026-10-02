import mongoose from "mongoose";

export default mongoose.model("Admin", new mongoose.Schema({
  username: { type: String, unique: true, sparse: true, trim: true },
  email: { type: String, unique: true, sparse: true, trim: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true }));
