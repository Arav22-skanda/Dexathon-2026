import Razorpay from "razorpay";

const gateway = () => new Razorpay({ key_id: process.env.PAYMENT_KEY_ID, key_secret: process.env.PAYMENT_KEY_SECRET });
export const createOrder = (registration) => gateway().orders.create({ amount: registration.payment.amount * 100, currency: "INR", receipt: registration.teamId });
