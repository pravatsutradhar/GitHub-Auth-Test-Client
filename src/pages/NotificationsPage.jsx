import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <div className="bg-slate-900 rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
          <h3 className="text-slate-300 font-medium">Notifications</h3>
          <p className="text-sm text-slate-400 mt-1">Your issue notifications and updates</p>
        </div>
        <div className="p-6 text-center text-slate-400">
          <p>No notifications yet</p>
        </div>
      </div>
    </DashboardLayout>
  );
}