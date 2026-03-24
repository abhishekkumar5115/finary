import { useState } from "react";
import {Menu,X,User,LogOut} from 'lucide-react'
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface NavbarProps {
    activeTab : 'accounts' | 'invoices',
    setActiveTab : (Tab:'accounts'|'invoices')=>void
}

const Navbar = ({activeTab,setActiveTab}:NavbarProps)=>{
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen,setProfileOpen] = useState(false);
    const {user} = useAuth();

    const handleLogout= () =>{
        localStorage.removeItem("access_token");
        window.location.href = "/login";
    }

    return (
        <header className="sticky top-0 z-20 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
            <div  className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                {/* Logo */}
                <h1 className="text-2xl font-bold text-indigo-700 tracking-tight flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex justify-center items-center shadow-xs">
                    F
                  </div>
                  Finary
                </h1>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex gap-4 items-center">
                    <button
                    onClick={() => setActiveTab("accounts")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                    activeTab === "accounts"
                    ? "bg-slate-800 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                    >
                    Accounts
                    </button>
                    <button
                    onClick={() => setActiveTab("invoices")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                    activeTab === "invoices"
                    ? "bg-slate-800 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                    >
                    Invoices
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative ml-4 border-l border-slate-200 pl-4">
                        <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-700 transition"
                        >
                            <div className="bg-slate-200 p-1.5 rounded-full">
                                <User size={16} className="text-slate-600" />
                            </div>
                            <span className="font-medium text-sm">{user?.full_name?.split(" ")[0] || "User"}</span>
                        </button>

                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                                <Link
                                to="/profile"
                                className="block px-4 py-3 hover:bg-slate-50 text-slate-700 text-sm font-medium border-b border-slate-100"
                                >
                                Profile Settings
                                </Link>

                                <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-3 hover:bg-rose-50 flex items-center gap-2 text-rose-600 text-sm font-medium transition"
                                >
                                <LogOut size={16} /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
                {/* MOBILE HAMBURGER */}
                <button
                className="md:hidden text-slate-800 p-2 hover:bg-slate-100 rounded-md"
                onClick={() => setMobileOpen(!mobileOpen)}
                >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* MOBILE NAV MENU */}
            {mobileOpen && (
            <div className="md:hidden flex flex-col gap-2 px-6 pb-4 bg-white border-t border-slate-200 shadow-sm transition-all">
            <button
            onClick={() => {
            setActiveTab("accounts");
            setMobileOpen(false);
            }}
            className={`px-4 py-3 mt-2 rounded-lg text-left font-medium ${
            activeTab === "accounts"
                ? "bg-slate-800 text-white"
                : "text-slate-700 hover:bg-slate-50"
            }`}
            >
            Accounts
            </button>

            <button
            onClick={() => {
            setActiveTab("invoices");
            setMobileOpen(false);
            }}
            className={`px-4 py-3 rounded-lg text-left font-medium ${
            activeTab === "invoices"
                ? "bg-slate-800 text-white"
                : "text-slate-700 hover:bg-slate-50"
            }`}
            >
            Invoices
            </button>

            <div className="h-px bg-slate-200 my-2"></div>

            <Link
            to="/profile"
            className="px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 font-medium"
            onClick={() => setMobileOpen(false)}
            >
            Profile Settings
            </Link>

            <button
            onClick={handleLogout}
            className="px-4 py-3 rounded-lg text-left flex items-center gap-2 text-rose-600 hover:bg-rose-50 font-medium transition"
            >
            <LogOut size={18} /> Logout
            </button>
            </div>
            )}
        </header>
    )
}

export default Navbar;