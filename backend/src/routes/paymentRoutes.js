import { Router } from "express";
import { createPaymentOrder, recordUpiTransaction, verifyPayment } from "../controllers/paymentController.js";
import { getPaymentSettings } from "../controllers/paymentSettingsController.js";

const router = Router();
router.get("/settings", getPaymentSettings);
router.post("/create", createPaymentOrder);
router.post("/verify", verifyPayment);
router.post("/upi-transaction", recordUpiTransaction);
export default router;
