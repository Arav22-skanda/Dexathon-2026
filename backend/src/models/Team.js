import mongoose from "mongoose";

export default mongoose.model("Team", new mongoose.Schema({ name: { type: String, required: true }, logo: String, teamId: { type: String, unique: true } }, { timestamps: true }));
