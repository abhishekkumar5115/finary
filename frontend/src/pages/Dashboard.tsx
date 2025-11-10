import { useState } from "react";
import ClientList from "../components/ClientList";
import InvoiceList from "../components/InvoiceList";
import { Users, FileText, LogOut } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"clients" | "invoices">("clients");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen w-screen bg-white flex flex-col ">
      {/* Top Navigation Bar */}
      <header className="w-full bg-gray-100 border-b border-gray-200 flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Finary</h1>

        <nav className="flex gap-6">
          <button
            onClick={() => setActiveTab("clients")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition ${
              activeTab === "clients"
                ? "bg-blue-500 text-white shadow-sm"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Users size={20} />
            Clients
          </button>

          <button
            onClick={() => setActiveTab("invoices")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition ${
              activeTab === "invoices"
                ? "bg-blue-500 text-white shadow-sm"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FileText size={20} />
            Invoices
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-white overflow-y-auto">
        {activeTab === "clients" ? <ClientList /> : <InvoiceList />}
      </main>
    </div>
  );
};

export default Dashboard;
