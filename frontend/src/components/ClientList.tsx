import { Link } from "react-router-dom";
import { useSuppliers } from "../services/supplierHooks";
import { TableSkeleton } from "./ui/Skeleton";

const ClientList = () => {
  const { data: clients, isLoading, isError } = useSuppliers();

  if (isLoading) {
    return (
      <div className="p-8 bg-white rounded-xl shadow-xs border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">Accounts</h2>
        </div>
        <TableSkeleton rows={5} columns={2} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md border border-red-100">
        Failed to fetch accounts. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-xl shadow-xs border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Accounts</h2>

        <Link
          to="/clients/new"
          className="bg-indigo-600 text-white px-5 py-2.5 text-sm font-medium rounded-lg hover:bg-indigo-700 transition shadow-xs"
        >
          + Add New Account
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-slate-200 rounded-lg">
          <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="text-left px-6 py-4 border-b">Account Name</th>
              <th className="text-left px-6 py-4 border-b">Contact Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clients?.map((client) => (
              <tr key={client.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-medium text-slate-900">
                  {client.name}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {client.email}
                </td>
              </tr>
            ))}
            {(!clients || clients.length === 0) && (
              <tr>
                <td
                  colSpan={2}
                  className="text-center py-10 text-slate-500 italic"
                >
                  No accounts found. Please add an account.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;
