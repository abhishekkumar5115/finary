import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

interface Client {
  id: string;
  name: string;
}

const CreateInvoice = () => {
  const [client, setClient] = useState<Client[]>([]);
  const [clientId, setClientId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({ INR: 1 });
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await api.get("/clients");
        setClient(response.data);
      } catch (error: unknown) {
        alert("Error fetching accounts");
      }
    };

    const fetchExchangeRates = async () => {
      try {
        // Using a free, open exchange rate API (no API key required for basic usage)
        const response = await fetch('https://open.er-api.com/v6/latest/INR');
        const data = await response.json();
        
        if (data && data.rates) {
          // The API returns rates relative to INR based on the url.
          // e.g. 1 INR = 0.012 USD. To find how many INR in 1 USD, we must invert it.
          const ratesRelativeToInr: Record<string, number> = {};
          
          for (const [curr, rate] of Object.entries(data.rates)) {
            // Inverse the rate so it means "1 unit of curr = X INR"
            ratesRelativeToInr[curr] = 1 / (rate as number);
          }
          
          // Guarantee INR is exactly 1 just in case of float math quirks
          ratesRelativeToInr['INR'] = 1;
          setExchangeRates(ratesRelativeToInr);
        }
      } catch (error) {
        console.error("Failed to fetch real-time exchange rates");
        // Fallback to basic rates if the API fails
        setExchangeRates({
          INR: 1, USD: 83.5, EUR: 90.2, GBP: 105.4, CAD: 61.2, AUD: 54.8
        });
      }
    };

    fetchClient();
    fetchExchangeRates();
  }, []);

  const calculatedInrAmount = amount ? (parseFloat(amount) * (exchangeRates[currency] || 1)).toFixed(2) : "0.00";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/invoices", {
        client_id: clientId,
        amount: calculatedInrAmount, // Submitting converted INR value
        due_date: dueDate,
        description: description || "Invoice Creation", // Include the new description field
      });
      setSuccess("Invoice created successfully!");
      setTimeout(() => navigate("/dashboard", { state: { tab: "invoices" } }), 1000);
    } catch (error: unknown) {
      if (error instanceof Error && 'response' in error) {
        const axErr = error as { response?: { data?: { message?: string } } };
        setError(axErr.response?.data?.message || "Failed to create invoice");
      } else {
        setError("Failed to create invoice");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left side: Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 border-r border-slate-200">
        <img
          src="https://images.unsplash.com/photo-1556742031-c6961e102a20?auto=format&fit=crop&w=1600&q=80"
          alt="Create Invoice"
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-white/20">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Streamline Invoice Creation</h2>
          <p className="text-slate-200 text-lg">Easily log new transactions in any currency, and we'll automatically normalize it for your financial records.</p>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 xl:px-16 bg-slate-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md xl:max-w-lg">
          <h2 className="mt-6 text-center lg:text-left text-3xl font-bold tracking-tight text-slate-900">
            Create Invoice
          </h2>
          <p className="mt-2 text-center lg:text-left text-sm text-slate-600">
            Log a new financial transaction against an account.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md xl:max-w-lg">
          <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Client Dropdown */}
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Select Account
                </label>
                <div className="mt-2">
                  <select
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    required
                    className="block w-full rounded-lg border-0 py-2.5 px-3.5 text-slate-900 shadow-xs ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  >
                    <option value="" disabled>
                      Select an account
                    </option>
                    {client.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Amount & Currency */}
              <div className="flex gap-4">
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-slate-700">
                    Currency
                  </label>
                  <div className="mt-2">
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="block w-full rounded-lg border-0 py-2.5 px-3.5 text-slate-900 shadow-xs ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                    >
                      {Object.keys(exchangeRates).map((curr) => (
                        <option key={curr} value={curr}>{curr}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700">
                    Amount
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      required
                      className="block w-full rounded-lg border-0 py-2.5 px-3.5 text-slate-900 shadow-xs ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              {/* Converted INR Display Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500">Converted Value (INR)</span>
                <span className="text-lg font-bold text-slate-800">
                  ₹ {calculatedInrAmount}
                </span>
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Transaction Notes
                </label>
                <div className="mt-2 text-slate-500 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 pt-2.5 pointer-events-none">
                    <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="E.g. Monthly subscription fee"
                    className="block w-full rounded-lg border-0 py-2.5 pl-10 pr-3.5 text-slate-900 shadow-xs ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* Due Date Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Due Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                    className="block w-full rounded-lg border-0 py-2.5 px-3.5 text-slate-900 shadow-xs ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  {loading ? "Creating..." : "Create Invoice"}
                </button>
              </div>
            </form>

            <button
              onClick={() => navigate("/dashboard", { state: { tab: "invoices" } })}
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

export default CreateInvoice;
