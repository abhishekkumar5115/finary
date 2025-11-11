import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

interface Client {
  id: string;
  name: string;
  email: string;
}

const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get("/clients");
        setClients(response.data);
      } catch (error: any) {
        setError("Failed to fetch clients. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  if (loading) {
    return <p className="text-gray-600">Loading clients...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-8 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Clients</h2>

        {/* ✅ Changed from button → Link */}
        <Link
          to="/clients/new"
          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-yellow-400 transition"
        >
          + Add New Client
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-6 py-3 border-b">Name</th>
              <th className="text-left px-6 py-3 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3 border-b font-medium text-gray-900">
                  {client.name}
                </td>
                <td className="px-6 py-3 border-b text-gray-700">
                  {client.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;
