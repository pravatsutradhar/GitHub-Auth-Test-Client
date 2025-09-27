import React from 'react';
import { Link } from 'react-router-dom';
import { useGetMeQuery, useLogoutMutation } from '../features/auth/authApiSlice';
import { FaGithub } from 'react-icons/fa';

export default function Header() {
  const { data, isLoading } = useGetMeQuery();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
  }

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="container-max mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-slate-900">
              <FaGithub className="text-2xl" />
              <span>OpenSource Helper</span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            {isLoading ? (
              <div className="h-9 w-24 bg-slate-100 animate-pulse rounded"></div>
            ) : data?.user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/settings" 
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900
                           bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/"
                className="inline-flex items-center gap-2 bg-[#2ea44f] text-white px-4 py-2 rounded-lg 
                          text-sm font-medium hover:bg-[#2c974b] transition-colors"
              >
                <FaGithub />
                Login with GitHub
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
