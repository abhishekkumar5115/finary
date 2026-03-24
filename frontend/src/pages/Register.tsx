import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", formData);
      setMessage("Registration successful! Redirecting to OTP...");
      setTimeout(() => navigate("/verify-otp",{state:{email : formData.email}}), 1000);
    } catch (error: unknown) {
      if (error instanceof Error && 'response' in error) {
        const axErr = error as { response?: { status?: number } };
        if (axErr.response?.status === 409) {
          setMessage("Email already exists. Please use another email.");
        } else {
          setMessage("Registration failed. Try again later.");
        }
      } else {
        setMessage("Registration failed. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side: Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-8">
            <Link to="/" className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex justify-center items-center">F</div>
              Finary
            </Link>
          </div>
          
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Start managing your wealth.{" "}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition">
              Already have an account? Sign in
            </Link>
          </p>

          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="full_name"
                  className="block text-sm font-medium text-slate-700"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-lg border-0 py-2.5 px-3.5 text-slate-900 shadow-xs ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-lg border-0 py-2.5 px-3.5 text-slate-900 shadow-xs ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-lg border-0 py-2.5 px-3.5 text-slate-900 shadow-xs ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Create a secure password"
                  />
                </div>
              </div>

              {message && (
                <div
                  className={`rounded-md p-4 text-sm ${
                    message.includes("success")
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-rose-50 text-rose-700"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 transition"
              >
                {loading ? "Registering..." : "Create account"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-50 border-l border-slate-200">
        <div className="absolute inset-0 flex items-center justify-center p-12">
           <div className="max-w-md text-center">
             <div className="mb-8">
               <img src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1600&q=80" alt="Finance Tracking" className="rounded-2xl shadow-2xl ring-1 ring-slate-900/10 object-cover aspect-[4/3]" />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 mb-2">Take control of your money</h3>
             <p className="text-slate-600">Register an account to start tracking everything, organizing your files, and seeing your whole financial picture.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
