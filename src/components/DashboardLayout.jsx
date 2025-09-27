import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGithub, FaCog, FaBook, FaBell } from 'react-icons/fa';
import { useGetMeQuery } from '../features/auth/authApiSlice';

function SidebarLink({ to, icon: Icon, children, isActive }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-50 text-blue-700'
          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Icon className="text-lg" />
      <span>{children}</span>
    </Link>
  );
}

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const { data } = useGetMeQuery();
  const user = data?.user;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* We now use the global Header component instead of a local one */}
      
      <main className="container-max mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1 space-y-6">
            {/* User Profile Card */}
            <div className="p-6 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user?.login}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                    <FaGithub className="text-slate-400 text-xl" />
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-slate-900">{user?.name || user?.login}</h3>
                  <p className="text-sm text-slate-500">@{user?.login}</p>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                <SidebarLink
                  to="/dashboard"
                  icon={FaBook}
                  isActive={location.pathname === '/dashboard'}
                >
                  Repositories
                </SidebarLink>
                <SidebarLink
                  to="/notifications"
                  icon={FaBell}
                  isActive={location.pathname === '/notifications'}
                >
                  Notifications
                </SidebarLink>
                <SidebarLink
                  to="/settings"
                  icon={FaCog}
                  isActive={location.pathname === '/settings'}
                >
                  Settings
                </SidebarLink>
              </nav>
            </div>

            {/* Stats Card */}
            <div className="p-6 bg-white rounded-lg border border-slate-200">
              <h3 className="font-medium text-slate-900 mb-4">Your Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Subscriptions</span>
                  <span className="font-medium text-slate-900">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Issues Assigned</span>
                  <span className="font-medium text-slate-900">0</span>
                </div>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-3 space-y-6">
            {children}
          </section>
        </div>
      </main>
    </div>
  );
}
