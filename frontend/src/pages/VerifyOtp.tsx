import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const lastSent = localStorage.getItem("otp_last_sent");
    if (!lastSent) {
      localStorage.setItem("otp_last_sent", Date.now().toString());
      setTimer(60);
    } else {
      const elapsed = Math.floor((Date.now() - Number(lastSent)) / 1000);
      const remaining = 60 - elapsed;

      if (remaining > 0) {
        setTimer(remaining);
      } else {
        setTimer(0);
      }
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    if (!otp || otp.length !== 6) {
      setMessage("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      await api.post("/auth/verify-otp", { email, otp });
      setMessage("OTP verified successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;
    setResendLoading(true);

    try {
      await api.post("/auth/resend-otp", { email });
      setMessage("OTP resent successfully! Check your inbox.");

      localStorage.setItem("otp_last_sent", Date.now().toString());

      setTimer(60);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error: any) {
      setMessage("Failed to resend OTP. Try again later.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Verify Your Email
        </h2>

        <p className="text-gray-600 mb-6">
          Enter the 6-digit verification code sent to:
          <br />
          <span className="font-semibold text-gray-900">{email}</span>
        </p>

        {/* OTP INPUT FIELD */}
        <input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center text-lg tracking-widest focus:ring-2 focus:ring-orange-500 outline-none"
        />

        {message && <p className="text-sm text-red-600 mt-3">{message}</p>}

        {/* VERIFY BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 rounded-lg mt-6 hover:bg-orange-400 disabled:opacity-50 transition"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* SMALL RESEND OTP BUTTON WITH TIMER */}
        <button
          onClick={handleResendOtp}
          disabled={timer > 0 || resendLoading}
          className="px-4 py-1 text-sm bg-gray-200 text-gray-800 rounded-md mt-3 hover:bg-gray-300 disabled:opacity-50 transition"
        >
          {timer > 0
            ? `Resend OTP (${timer}s)`
            : resendLoading
            ? "Resending..."
            : "Resend OTP"}
        </button>

        {/* GO TO LOGIN */}
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

export default VerifyOtp;
