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
      } catch (error: any) {
        alert("Error fetching clients");
      }
    };
    fetchClient();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/invoices", {
        client_id: clientId,
        amount,
        due_date: dueDate,
      });
      setSuccess("Invoice created successfully!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to create invoice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Create New Invoice
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Client Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select Client
            </label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="" disabled>
                Select client
              </option>
              {client.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Due Date Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-yellow-400 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Invoice"}
          </button>
        </form>

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

export default CreateInvoice;
