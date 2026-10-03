import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import PaymentPage from "./pages/PaymentPage";
import ThankYouPage from "./pages/ThankYouPage";
import ThankYou from "./pages/ThankYou";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPaymentSettings from "./pages/AdminPaymentSettings";
import PaymentHistory from "./pages/PaymentHistory";

import "./styles/dexathon.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main DEXATHON Home Page */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Team Registration - Login Required */}
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <RegisterPage />
            </ProtectedRoute>
          }
        />

        {/* Payment */}
        <Route
          path="/payment"
          element={<PaymentPage />}
        />

        {/* Thank You Pages */}
        <Route
          path="/thank-you/:id"
          element={<ThankYouPage />}
        />

        <Route
          path="/thank-you"
          element={<ThankYou />}
        />

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Protected Admin Routes */}
        <Route element={<AdminProtectedRoute />}>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/payment-history"
            element={<PaymentHistory />}
          />

          <Route
            path="/admin/payment-settings"
            element={<AdminPaymentSettings />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
