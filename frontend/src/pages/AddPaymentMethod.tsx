import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddPaymentMethod = () => {
  const { user, fetchProfile, loading } = useAuth();
  const [vpa, setVpa] = useState<string>("");
  const [vpaStatus, setVpaStatus] = useState<string | null>(null);
  const [vpaName, setVpaName] = useState("");
  const [isVpaValidated, setIsVpaValidated] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.vpa_address) {
      setVpa(user.vpa_address);
    }
  }, [user]);

  const handleUpdateVpa = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      await api.patch("/users/add-payment-method", { vpa_address: vpa });
      await fetchProfile();

      setSuccess("Payment method added successfully!");
      setTimeout(() => navigate("/profile"), 1000);
    } catch (err) {
      setError("Failed to add payment method! Try again.");
    }
  };

  //vpa validation 
  const vpaValidation = async() =>{
    if (!vpa.trim()) {
    setVpaStatus("invalid");
    return;
    }

    try {
      const res = await api.post("/payments/validate-vpa",{vpa});

      if(res.data.valid){
        setVpaStatus("valid");
        setVpaName(res.data.beneficiary);
        setIsVpaValidated(true);
      }else {
      setVpaStatus("invalid");
      setIsVpaValidated(false);
    }
    } catch (error) {
      setVpaStatus("invalid");
      setIsVpaValidated(false);
    }
  }

  if (loading) {
    return <div className="text-center mt-20 text-gray-800">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="text-center mt-20 text-gray-800">Please login first.</div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* PAGE TITLE */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
          Add Payment Method
        </h2>

        {/* USER NAME */}
        <p className="text-center text-gray-600 mb-6">
          Hello, <span className="font-semibold">{user.full_name}</span>
        </p>

        <form onSubmit={handleUpdateVpa} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              UPI / VPA Address
            </label>

            <input
              type="text"
              value={vpa}
              onChange={(e) => {
              setVpa(e.target.value);
              setIsVpaValidated(false);
              setVpaStatus(null);
              }}
              placeholder="example@upi"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* VERIFY UPI LINK */}
            <p
            className="text-blue-600 text-sm mt-2 cursor-pointer hover:underline"
            onClick={vpaValidation}
            >
            Verify UPI Address
            </p>
          </div>

                {vpaStatus === "valid" && (
                <p className="text-green-600 text-sm mt-1">
                ✔ Valid UPI! Name: <strong>{vpaName}</strong>
                </p>
                )}

                {vpaStatus === "invalid" && (
                <p className="text-red-500 text-sm mt-1">❌ Invalid UPI Address</p>
                )}

          {/* MESSAGES */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            disabled={!isVpaValidated}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            Save Payment Method
          </button>
        </form>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full text-blue-600 mt-4 hover:underline text-sm"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AddPaymentMethod;
