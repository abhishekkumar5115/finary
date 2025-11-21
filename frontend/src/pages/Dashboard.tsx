import { useState } from "react";
import ClientList from "../components/ClientList";
import InvoiceList from "../components/InvoiceList";
import Navbar from "../components/header/Navbar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"clients" | "invoices">("clients");

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Top Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

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
