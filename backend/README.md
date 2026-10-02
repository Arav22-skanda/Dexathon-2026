# DEXATHON 2026 Backend

1. Copy `.env.example` to `.env` and provide MongoDB, JWT, email, Razorpay, and initial admin credentials.
2. Run `npm install`.
3. Run `npm run dev` to start the API on port 5000.

The frontend is a separate Vite app in `../frontend` and communicates through `VITE_API_URL`.

On its first successful connection, the backend creates the `ADMIN_EMAIL` account using `ADMIN_PASSWORD`. Change the password before deploying.
