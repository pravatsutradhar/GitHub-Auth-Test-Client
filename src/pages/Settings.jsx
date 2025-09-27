import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import SettingsForm from '../components/SettingsForm';

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-slate-900">Account Settings</h2>
          <p className="text-sm text-slate-600 mt-1">
            Manage your notification preferences and account settings
          </p>
        </div>
        <div className="p-6">
          <SettingsForm />
        </div>
      </div>
    </DashboardLayout>
  );
}
