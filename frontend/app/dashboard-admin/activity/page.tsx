"use client";

import { useEffect, useState } from "react";
import { getAdminActivityApi } from "@/lib/admin";

interface Log {
  _id: string;
  user: string;
  action: string;
  time: string;
  type: "Success" | "Warning" | "Error";
}

export default function ActivityPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getAdminActivityApi();
        setLogs(data);
      } catch (error) {
        console.error("Failed to fetch logs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
        Activity Logs
      </h2>

      {/* ===== Desktop Table ===== */}
      <div className="hidden md:block bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm text-gray-500">Loading logs...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 uppercase text-xs tracking-wide">
              <tr>
                <th className="text-left px-6 py-4">User</th>
                <th className="text-left px-6 py-4">Action</th>
                <th className="text-left px-6 py-4">Time</th>
                <th className="text-left px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {log.user}
                  </td>

                  <td className="px-6 py-4 text-slate-600">{log.action}</td>

                  <td className="px-6 py-4 text-slate-500">
                    {new Date(log.time).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge type={log.type} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ===== Mobile Cards ===== */}
      <div className="grid gap-4 md:hidden">
        {logs.map((log) => (
          <div
            key={log._id}
            className="bg-white border rounded-xl p-4 shadow-sm space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-slate-700">{log.user}</p>

                <p className="text-xs text-slate-500">
                  {new Date(log.time).toLocaleString()}
                </p>
              </div>

              <StatusBadge type={log.type} />
            </div>

            <p className="text-sm text-slate-600">{log.action}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== Status Badge ===== */

function StatusBadge({ type }: any) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        type === "Success"
          ? "bg-green-50 text-green-600"
          : type === "Warning"
            ? "bg-yellow-50 text-yellow-600"
            : "bg-red-50 text-red-600"
      }`}
    >
      {type}
    </span>
  );
}
