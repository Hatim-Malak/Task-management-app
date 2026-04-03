import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckSquare,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../store/useAuthStore.js";

const Navbar = () => {
  const authUser = useAuth((state) => state.authUser);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <CheckSquare className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </Link>

          {authUser && (
            <>
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-6">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-slate-700 hover:text-cyan-600 font-medium transition-colors"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {open ? (
                  <X className="w-6 h-6 text-slate-700" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-700" />
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {authUser && open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-4">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 text-slate-700 font-medium"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg font-semibold"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
