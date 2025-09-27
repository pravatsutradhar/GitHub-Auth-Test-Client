import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import RepoList from '../features/repo/RepoList';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-4 bg-white rounded border">
        <h2 className="text-xl font-semibold">Your Subscriptions</h2>
        <p className="text-sm text-slate-600 mt-2">Manage the repositories you follow and your issue delivery preferences.</p>
        <div className="mt-4">
          <RepoList />
        </div>
      </div>
    </DashboardLayout>
  );
}
