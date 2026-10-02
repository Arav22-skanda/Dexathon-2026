import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import adminRoutes from "./routes/adminRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import { seedAdmin } from "./utils/seedAdmin.js";
import { verifyEmailTransport } from "./services/emailService.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || process.env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: "4mb" }));
app.use("/uploads", express.static("uploads"));

app.get("/api/health", (_request, response) => response.json({ ok: true }));
app.use("/api/registrations", registrationRoutes);
app.use("/api/payment", paymentRoutes);
app.get("/api/payment-settings", (request, response, next) => import("./controllers/paymentSettingsController.js").then(({ getPaymentSettings }) => getPaymentSettings(request, response)).catch(next));
app.use("/api/admin", adminRoutes);

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(error.status || 500).json({ message: error.message || "An unexpected error occurred." });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await seedAdmin();
    verifyEmailTransport();
    app.listen(process.env.PORT || 5000, () => console.log("DEXATHON API running"));
  })
  .catch((error) => {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  });
