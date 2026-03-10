"use client";

import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { getAdminOverviewApi, getAdminAnalyticsApi } from "@/lib/admin";

const COLORS = ["#10B981", "#EF4444"];

export default function AdminDashboard() {
  const [overview, setOverview] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const overviewData = await getAdminOverviewApi();
        const analyticsData = await getAdminAnalyticsApi();

        setOverview(overviewData);
        setAnalytics(analyticsData);
      } catch (error) {
        console.error("ADMIN DASHBOARD ERROR:", error);
      }
    };

    fetchData();
  }, []);

  if (!overview || !analytics)
    return <p className="text-slate-500">Loading...</p>;

  const scanDistribution = [
    { name: "Normal", value: overview.totalScans - overview.positiveCases },
    { name: "Detected", value: overview.positiveCases },
  ];

  const userGrowthData = analytics.monthlyScans.map((m: any) => ({
    month: `M${m._id}`,
    users: m.count,
  }));

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* ===== Heading ===== */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">
          Admin Dashboard
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Monitor system activity, users, and glaucoma scan analytics.
        </p>
      </div>

      {/* ===== Stats ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard title="Total Users" value={overview.totalUsers} />

        <StatCard title="Total Scans" value={overview.totalScans} />

        <StatCard title="Glaucoma Cases" value={overview.positiveCases} />

        <StatCard title="Detection Rate" value={`${overview.detectionRate}%`} />
      </div>

      {/* ===== Charts ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Scans */}
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border">
          <h3 className="text-sm font-semibold mb-4">Monthly Scans</h3>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={userGrowthData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#0F766E"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Scan Distribution */}
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border">
          <h3 className="text-sm font-semibold mb-4">Scan Distribution</h3>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={scanDistribution}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
              >
                {scanDistribution.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ===== Stat Card ===== */

function StatCard({ title, value }: any) {
  return (
    <div className="bg-white rounded-xl px-5 py-4 shadow-sm border">
      <p className="text-xs uppercase text-slate-500">{title}</p>

      <p className="text-xl sm:text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}
