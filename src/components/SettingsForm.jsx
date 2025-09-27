import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useGetSettingsQuery, useUpdateSettingsMutation } from '../features/user/userApiSlice';

function FormGroup({ label, children, helpText }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-900 mb-2">
        {label}
      </label>
      {children}
      {helpText && (
        <p className="mt-1 text-sm text-slate-500">{helpText}</p>
      )}
    </div>
  );
}

export default function SettingsForm() {
  const { data, isLoading } = useGetSettingsQuery();
  const [updateSettings, { isLoading: isSaving }] = useUpdateSettingsMutation();
  const [form, setForm] = useState({
    emailFrequency: 'daily',
    maxIssuesPerDay: 50,
    isPublic: true,
    skipIssuesWithPR: false,
    favoriteLanguages: []
  });

  useEffect(() => {
    if (data?.isPublic !== undefined) setForm(data);
  }, [data]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await updateSettings(form);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <FaSpinner className="animate-spin text-2xl text-blue-600" />
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="max-w-2xl">
      <FormGroup
        label="Email Frequency"
        helpText="How often would you like to receive issue notifications?"
      >
        <select
          value={form.emailFrequency}
          onChange={(e) => setForm({ ...form, emailFrequency: e.target.value })}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900
                   focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="daily">Daily Digest</option>
          <option value="weekly">Weekly Summary</option>
          <option value="off">Don't send emails</option>
        </select>
      </FormGroup>

      <FormGroup
        label="Maximum Issues per Day"
        helpText="Limit the number of new issues you receive each day"
      >
        <input
          type="number"
          min="1"
          max="100"
          value={form.maxIssuesPerDay}
          onChange={(e) => setForm({ ...form, maxIssuesPerDay: Number(e.target.value) })}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900
                   focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </FormGroup>

      <FormGroup label="Profile Visibility">
        <div className="mt-1 space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={form.isPublic}
              onChange={(e) => setForm({ ...form, isPublic: e.target.checked })}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="ml-2 text-sm text-slate-600">
              Make my profile public
            </span>
          </label>
        </div>
      </FormGroup>

      <FormGroup label="Issue Preferences">
        <div className="mt-1 space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={form.skipIssuesWithPR}
              onChange={(e) => setForm({ ...form, skipIssuesWithPR: e.target.checked })}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="ml-2 text-sm text-slate-600">
              Skip issues that already have pull requests
            </span>
          </label>
        </div>
      </FormGroup>

      <div className="mt-8 flex items-center justify-end gap-4">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900
                   bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors
                    ${isSaving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <FaSpinner className="animate-spin" />
              Saving...
            </span>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </form>
  );
}
