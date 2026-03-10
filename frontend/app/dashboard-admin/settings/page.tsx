"use client";

import api from "@/lib/api";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [uploadLimit, setUploadLimit] = useState(10);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoLogout, setAutoLogout] = useState(30);

  useEffect(() => {
    const loadSettings = async () => {
      const res = await api.get("/api/admin/settings");

      setUploadLimit(res.data.uploadLimit);
      setEmailNotifications(res.data.emailNotifications);
      setMaintenanceMode(res.data.maintenanceMode);
      setAutoLogout(res.data.autoLogout);
    };

    loadSettings();
  }, []);

  const saveSettings = async () => {
    try {
      await api.put("/api/admin/settings", {
        uploadLimit,
        emailNotifications,
        maintenanceMode,
        autoLogout,
      });

      alert("Settings saved successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save settings");
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
        System Settings
      </h2>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 sm:p-6 space-y-6">
        {/* Upload Limit */}
        <SettingRow
          title="Upload Size Limit (MB)"
          desc="Maximum file size allowed for retinal scans"
        >
          <input
            type="number"
            value={uploadLimit}
            onChange={(e) => setUploadLimit(Number(e.target.value))}
            className="w-full sm:w-24 border border-slate-300 rounded-md px-3 py-1 text-sm"
          />
        </SettingRow>

        {/* Email Notifications */}
        <SettingRow
          title="Email Notifications"
          desc="Send email alerts for high-risk detections"
        >
          <Toggle
            enabled={emailNotifications}
            onClick={() => setEmailNotifications(!emailNotifications)}
          />
        </SettingRow>

        {/* Maintenance Mode */}
        <SettingRow
          title="Maintenance Mode"
          desc="Temporarily disable system access for users"
        >
          <Toggle
            enabled={maintenanceMode}
            color="red"
            onClick={() => setMaintenanceMode(!maintenanceMode)}
          />
        </SettingRow>

        {/* Auto Logout */}
        <SettingRow
          title="Auto Logout (minutes)"
          desc="Automatically log out inactive users"
        >
          <input
            type="number"
            value={autoLogout}
            onChange={(e) => setAutoLogout(Number(e.target.value))}
            className="w-full sm:w-24 border border-slate-300 rounded-md px-3 py-1 text-sm"
          />
        </SettingRow>

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-200">
          <button
            onClick={saveSettings}
            className="w-full sm:w-auto px-6 py-2 bg-teal-600 text-white rounded-md text-sm hover:bg-teal-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== Setting Row Component ===== */

function SettingRow({ title, desc, children }: any) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-slate-700">{title}</p>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>

      {children}
    </div>
  );
}

/* ===== Toggle Component ===== */

function Toggle({ enabled, onClick, color = "teal" }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-12 h-6 flex items-center rounded-full transition ${
        enabled
          ? color === "red"
            ? "bg-red-500"
            : "bg-teal-600"
          : "bg-slate-300"
      }`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
