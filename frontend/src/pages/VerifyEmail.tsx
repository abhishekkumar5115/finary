import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Checking verification status...");
  const [email, setEmail] = useState("");
  const [showResend, setShowResend] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    // No token → show message & enable resend button
    if (!token) {
      setMessage("A verification link was sent to your email.");
      setShowResend(true);
      return;
    }

    // Token exists → try verifying
    api
      .get(`/auth/verify-email?token=${token}`)
      .then(() => {
        setMessage("Your email has been successfully verified! 🎉");

        // Redirect to login after 2 seconds
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((err) => {
        setMessage(
          err.response?.data?.message || "Verification failed. Try again."
        );
        setShowResend(true);
      });
  }, []);

  // Resend verification email handler
  const handleResend = async () => {
    if (!email) {
      setMessage("Enter your email to resend verification.");
      return;
    }

    try {
      await api.post(`/auth/resend-email-verification`, { email });
      setMessage("Verification email resent successfully! Check your inbox.");
      setShowResend(false);
    } catch (error) {
      setMessage("Failed to resend email. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Email Verification
        </h2>

        <p className="text-gray-700 mb-4">{message}</p>

        {/* Show resend UI only if needed */}
        {showResend && (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
            />

            <button
              onClick={handleResend}
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-400 transition"
            >
              Resend Verification Email
            </button>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline text-sm"
          >
            Go to Login →
          </button>
        </div>

      </div>
    </div>
  );
};

export default VerifyEmail;
