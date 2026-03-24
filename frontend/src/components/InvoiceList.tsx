import { Link } from "react-router-dom";
import { useInvoices } from "../services/invoiceHooks";
import { TableSkeleton } from "./ui/Skeleton";

const InvoiceList = () => {
  const { data: invoices, isLoading, isError } = useInvoices();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-6">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xs p-8 border border-slate-200">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-slate-800">Invoices</h2>
          </div>
          <TableSkeleton rows={5} columns={5} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xs p-8 border border-slate-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-slate-800">Invoices</h2>
          <Link
            to="/invoices/new"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-xs transition-all duration-200 text-sm font-medium"
          >
            + Create New Invoice
          </Link>
        </div>

        {isError && (
          <p className="text-red-600 text-sm mb-4 bg-red-50 p-3 rounded-md border border-red-100">
            Failed to fetch invoices. Please try again later.
          </p>
        )}

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="text-left px-6 py-4 border-b">Account</th>
                <th className="text-left px-6 py-4 border-b">Amount</th>
                <th className="text-left px-6 py-4 border-b">Created At</th>
                <th className="text-left px-6 py-4 border-b">Due Date</th>
                <th className="text-left px-6 py-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-slate-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 font-medium text-slate-900">{invoice.client?.name}</td>
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    ₹{invoice.amount}
                  </td>
                  <td className="px-6 py-4">{formatDate(invoice.created_at)}</td>
                  <td className="px-6 py-4">{formatDate(invoice.due_date)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        invoice.status === "Paid"
                          ? "bg-emerald-100 text-emerald-700"
                          : invoice.status === "Overdue"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {invoice.status || "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
              {(!invoices || invoices.length === 0) && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-10 text-slate-500 italic"
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
