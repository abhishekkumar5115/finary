import { useEffect, useState } from "react";
import api from "../api/axios";

interface Invoice {
  id: string;
  client: {
    name: string;
  };
  amount: number;
  created_at: string;
  due_date?: string;
  status?: string;
}

const InvoiceList = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await api.get("/invoices");
        setInvoices(response.data);
      } catch (err) {
        setError("Failed to fetch invoices. Please try again later.");
      }
    };
    fetchInvoices();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleDateString();
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Invoices</h2>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
          + Create New Invoice
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="text-left px-6 py-3 border-b">Client</th>
              <th className="text-left px-6 py-3 border-b">Amount</th>
              <th className="text-left px-6 py-3 border-b">Created At</th>
              <th className="text-left px-6 py-3 border-b">Due Date</th>
              <th className="text-left px-6 py-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-100 text-gray-700 transition">
                <td className="px-6 py-3 border-b">{invoice.client?.name}</td>
                <td className="px-6 py-3 border-b font-medium">
                  ₹{invoice.amount}
                </td>
                <td className="px-6 py-3 border-b">
                  {formatDate(invoice.created_at)}
                </td>
                <td className="px-6 py-3 border-b">
                  {formatDate(invoice.due_date)}
                </td>
                <td className="px-6 py-3 border-b">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      invoice.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : invoice.status === "Overdue"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {invoice.status || "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;
