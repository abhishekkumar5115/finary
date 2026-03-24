import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ClientList from "../components/ClientList";
import InvoiceList from "../components/InvoiceList";
import Navbar from "../components/header/Navbar";

const Dashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"accounts" | "invoices">("accounts");

  useEffect(() => {
    if (location.state && location.state.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 w-full">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <div>
               <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Financial Dashboard</h1>
               <p className="text-slate-500 mt-1">Manage your accounts and track recent financial activity.</p>
             </div>
             <div className="flex gap-3">
               <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-slate-50 transition">
                 Download Report
               </button>
               <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-indigo-700 transition shadow-indigo-600/20">
                 New Transaction
               </button>
             </div>
          </div>

          {/* Welcome Section */}
          <div className="bg-white p-8 rounded-2xl shadow-xs border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 mt-6 bg-linear-to-r from-indigo-50 to-white">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Welcome to your Personal Space</h2>
              <p className="text-slate-600 mt-2 max-w-2xl">Use this dashboard to manage your financial accounts and invoice history over time. Seamlessly add new accounts or file invoices directly from the panels below.</p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center border border-indigo-100">
                <svg className="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {activeTab === "accounts" ? <ClientList /> : <InvoiceList />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
