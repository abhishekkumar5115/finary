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
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm flex justify-between items-center px-8 py-4">
        <h1 className="text-3xl font-extrabold text-orange-500 tracking-tight">Finary</h1>


        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab("clients")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === "clients"
                ? "bg-orange-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            }`}
          >
            <Users size={18} />
            Clients
          </button>

          <button
            onClick={() => setActiveTab("invoices")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === "invoices"
                ? "bg-orange-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            }`}
          >
            <FileText size={18} />
            Invoices
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 bg-gray-50 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {activeTab === "clients" ? <ClientList /> : <InvoiceList />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
