import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

export const seedAdmin = async () => {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) return;

  const existingAdmin = await Admin.findOne({ username });
  if (existingAdmin) return;

  await Admin.create({ username, passwordHash: await bcrypt.hash(password, 12) });
  console.log(`Initial admin created for ${username}`);
};
