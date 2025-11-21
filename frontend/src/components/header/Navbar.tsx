import { useState } from "react";
import {Menu,X,User,LogOut} from 'lucide-react'
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface NavbarProps {
    activeTab : 'clients' | 'invoices',
    setActiveTab : (Tab:'clients'|'invoices')=>void
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
        <header className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div  className="flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <h1 className="text-3xl font-extrabold text-orange-500 tracking-tight">
                Finary
                </h1>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex gap-4 items-center">
                    <button
                    onClick={() => setActiveTab("clients")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === "clients"
                    ? "bg-orange-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-200"
                    }`}
                    >
                    Clients
                    </button>
                    <button
                    onClick={() => setActiveTab("invoices")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === "invoices"
                    ? "bg-orange-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-200"
                    }`}
                    >
                    Invoices
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-800 transition"
                        >
                            <User size={18} />
                            <span>{user?.full_name?.split(" ")[0] || "User"}</span>
                        </button>

                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200">
                                <Link
                                to="/profile"
                                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                                >
                                Profile
                                </Link>

                                <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700"
                                >
                                <LogOut size={16} /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
                {/* MOBILE HAMBURGER */}
                <button
                className="md:hidden text-gray-800"
                onClick={() => setMobileOpen(!mobileOpen)}
                >
                {mobileOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* MOBILE NAV MENU */}
            {mobileOpen && (
            <div className="md:hidden flex flex-col gap-2 px-6 pb-4 bg-white border-t border-gray-200">
            <button
            onClick={() => {
            setActiveTab("clients");
            setMobileOpen(false);
            }}
            className={`px-4 py-2 rounded-lg text-left ${
            activeTab === "clients"
                ? "bg-orange-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            >
            Clients
            </button>

            <button
            onClick={() => {
            setActiveTab("invoices");
            setMobileOpen(false);
            }}
            className={`px-4 py-2 rounded-lg text-left ${
            activeTab === "invoices"
                ? "bg-orange-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            >
            Invoices
            </button>

            <Link
            to="/profile"
            className="px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
            onClick={() => setMobileOpen(false)}
            >
            Profile
            </Link>

            <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-left flex items-center gap-2 text-gray-700 hover:bg-gray-100"
            >
            <LogOut size={16} /> Logout
            </button>
            </div>
            )}
        </header>
    )
}

export default Navbar;