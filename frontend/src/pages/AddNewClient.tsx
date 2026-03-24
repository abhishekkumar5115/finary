import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AddNewClient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/clients", formData);
      setSuccess("Account added successfully!");
      setTimeout(() => navigate("/dashboard", { state: { tab: "accounts" } }), 1000);
    } catch (err: unknown) {
      setError("Failed to add account. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left side: Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&w=1600&q=80"
          alt="Adding new account"
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Grow Your Network</h2>
          <p className="text-slate-200 text-lg">Easily onboard new accounts and keep all your financial relationships neatly organized in one secure place.</p>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 xl:px-16 bg-slate-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md xl:max-w-lg">
          <div className="flex items-center justify-center mb-8 lg:hidden">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              FA
            </div>
          </div>
          
          <h2 className="text-center lg:text-left text-3xl font-bold tracking-tight text-slate-900">
            Add New Account
          </h2>
          <p className="mt-2 text-center lg:text-left text-sm text-slate-600">
            Create a new financial profile to track.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md xl:max-w-lg">
          <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                  Account Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-lg border-0 py-2.5 px-3.5 text-slate-900 shadow-xs ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Enter account name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email Address
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
                    placeholder="Enter contact email"
                  />
                </div>
              </div>

              {error && <p className="text-rose-500 text-sm bg-rose-50 p-3 rounded-md border border-rose-100">{error}</p>}
              {success && <p className="text-emerald-600 text-sm bg-emerald-50 p-3 rounded-md border border-emerald-100">{success}</p>}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 transition"
                >
                  {loading ? "Adding..." : "Add Account"}
                </button>
              </div>
            </form>

            <button
              onClick={() => navigate("/dashboard", { state: { tab: "accounts" } })}
              className="w-full text-indigo-600 mt-8 hover:text-indigo-500 text-sm font-medium transition flex items-center justify-center gap-1.5 p-2 rounded-lg hover:bg-indigo-50"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewClient;
