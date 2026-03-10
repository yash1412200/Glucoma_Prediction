"use client";

import { useEffect, useState } from "react";
import { getAdminUsersApi, toggleUserStatusApi } from "@/lib/admin";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  scans: number;
  status: "Active" | "Inactive";
  joined: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await getAdminUsersApi();
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleStatus = async (id: string) => {
    try {
      await toggleUserStatusApi(id);

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id
            ? {
                ...user,
                status: user.status === "Active" ? "Inactive" : "Active",
              }
            : user,
        ),
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
        User Management
      </h2>

      {/* ===== Desktop Table ===== */}
      <div className="hidden md:block bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm text-gray-500">Loading users...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 uppercase text-xs tracking-wide">
              <tr>
                <th className="text-left px-6 py-4">Name</th>
                <th className="text-left px-6 py-4">Email</th>
                <th className="text-left px-6 py-4">Role</th>
                <th className="text-left px-6 py-4">Scans</th>
                <th className="text-left px-6 py-4">Joined</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-left px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {user.name}
                  </td>

                  <td className="px-6 py-4 text-slate-600">{user.email}</td>

                  <td className="px-6 py-4 text-slate-500 capitalize">
                    {user.role}
                  </td>

                  <td className="px-6 py-4 text-slate-500">{user.scans}</td>

                  <td className="px-6 py-4 text-slate-500">
                    {new Date(user.joined).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={user.status} />
                  </td>

                  <td className="px-6 py-4">
                    <ActionButton user={user} toggleStatus={toggleStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ===== Mobile Cards ===== */}
      <div className="grid gap-4 md:hidden">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white border rounded-xl p-4 shadow-sm space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-slate-700">{user.name}</p>

                <p className="text-xs text-slate-500">{user.email}</p>
              </div>

              <StatusBadge status={user.status} />
            </div>

            <div className="grid grid-cols-2 text-xs gap-3 text-slate-500">
              <p>Role: {user.role}</p>
              <p>Scans: {user.scans}</p>
              <p>Joined: {new Date(user.joined).toLocaleDateString()}</p>
            </div>

            <ActionButton user={user} toggleStatus={toggleStatus} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== Status Badge ===== */

function StatusBadge({ status }: any) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        status === "Active"
          ? "bg-green-50 text-green-600"
          : "bg-red-50 text-red-600"
      }`}
    >
      {status}
    </span>
  );
}

/* ===== Action Button ===== */

function ActionButton({ user, toggleStatus }: any) {
  return (
    <button
      onClick={() => toggleStatus(user._id)}
      className="text-xs px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 transition"
    >
      {user.status === "Active" ? "Disable" : "Enable"}
    </button>
  );
}
