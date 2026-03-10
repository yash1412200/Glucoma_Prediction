"use client";

import { useEffect, useState } from "react";
import { Eye, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { getDashboardStatsApi, getRecentAnalysisApi } from "@/lib/user";

interface Scan {
  _id: string;
  prediction: "Normal" | "Glaucoma";
}

export default function DashboardHome() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalScans: 0,
    normalResults: 0,
    detectedCases: 0,
  });
  const [recent, setRecent] = useState<Scan[]>([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const statsRes = await getDashboardStatsApi();
        const recentRes = await getRecentAnalysisApi();

        setStats(statsRes);
        setRecent(recentRes);
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <p className="text-slate-500">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-8 sm:space-y-10 ">
      {/* Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">
          Overview
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Monitor your AI scan activity and upload new retinal images.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          title="Total Scans"
          value={stats.totalScans}
          icon={<Eye size={20} />}
          iconBg="bg-teal-50"
          iconColor="text-teal-600"
        />

        <StatCard
          title="Normal Results"
          value={stats.normalResults}
          icon={<CheckCircle size={20} />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
          valueColor="text-green-600"
        />

        <StatCard
          title="Detected Cases"
          value={stats.detectedCases}
          icon={<AlertTriangle size={20} />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
          valueColor="text-red-600"
        />
      </div>

      {/* Upload CTA */}
      <div
        onClick={() => router.push("/dashboard/upload")}
        className="group bg-white rounded-2xl border p-6 sm:p-8 cursor-pointer
                   hover:shadow-xl hover:-translate-y-1 hover:border-teal-200
                   transition-all duration-300"
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-semibold group-hover:text-teal-600">
              Upload New Retinal Scan
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Click to upload and analyze a new fundus image.
            </p>
          </div>

          <ArrowRight className="text-slate-400 group-hover:translate-x-1 transition flex-shrink-0" />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border p-5 sm:p-6 shadow-sm">
        <h3 className="text-base sm:text-lg font-semibold mb-4">
          Recent Activity
        </h3>

        {recent.length === 0 ? (
          <p className="text-sm text-slate-500">No scans available yet.</p>
        ) : (
          <ul className="space-y-3 text-sm">
            {recent.slice(0, 3).map((scan, idx) => (
              <li
                key={scan._id}
                className="flex justify-between px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                <span>Scan #{idx + 1}</span>

                <span
                  className={
                    scan.prediction === "Normal"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {scan.prediction}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ---------- Stat Card ---------- */

function StatCard({
  title,
  value,
  icon,
  iconBg,
  iconColor,
  valueColor,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  valueColor?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border hover:shadow-xl transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <p
            className={`text-2xl sm:text-3xl font-semibold mt-2 ${valueColor || ""}`}
          >
            {value}
          </p>
        </div>

        <div className={`p-3 rounded-xl ${iconBg}`}>
          <div className={iconColor}>{icon}</div>
        </div>
      </div>
    </div>
  );
}
