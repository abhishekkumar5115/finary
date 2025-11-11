import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Invoices</h2>
          <Link
            to="/invoices/new"
            className="bg-green-600 hover:bg-yellow-400 text-white px-6 py-2.5 rounded-lg shadow transition-all duration-200 font-medium"
          >
            + Create New Invoice
          </Link>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-4 bg-red-50 p-3 rounded-md border border-red-100">
            {error}
          </p>
        )}

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-800 uppercase text-xs tracking-wider">
              <tr>
                <th className="text-left px-6 py-4">Client</th>
                <th className="text-left px-6 py-4">Amount</th>
                <th className="text-left px-6 py-4">Created At</th>
                <th className="text-left px-6 py-4">Due Date</th>
                <th className="text-left px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-blue-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 font-medium">{invoice.client?.name}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ₹{invoice.amount}
                  </td>
                  <td className="px-6 py-4">{formatDate(invoice.created_at)}</td>
                  <td className="px-6 py-4">{formatDate(invoice.due_date)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
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
              {invoices.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-10 text-gray-500 italic"
                  >
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
