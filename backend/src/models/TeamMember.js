import mongoose from "mongoose";

export default mongoose.model("TeamMember", new mongoose.Schema({ name: String, email: String, phone: String, studentId: String, team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" } }, { timestamps: true }));
