import { Clock, Eye } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

export function RecentAnalysis() {
  return (
    <div className="bg-white rounded-2xl p-6 space-y-6">

      <div className="flex items-center gap-2">
        <Clock size={18} className="text-gray-500" />
        <h3 className="font-semibold">Recent Analysis</h3>
      </div>

      <div className="space-y-4">

        {/* Row 1 */}
        <div className="flex items-center justify-between p-4 rounded-xl border">

          <div className="flex items-center gap-3">
            <Eye size={18} className="text-gray-500" />
            <div>
              <p className="text-sm font-medium">Left Eye</p>
              <p className="text-xs text-gray-500">2026-02-20</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">94%</span>
            <StatusBadge status="Normal" />
          </div>

        </div>

        {/* Row 2 */}
        <div className="flex items-center justify-between p-4 rounded-xl border">

          <div className="flex items-center gap-3">
            <Eye size={18} className="text-gray-500" />
            <div>
              <p className="text-sm font-medium">Right Eye</p>
              <p className="text-xs text-gray-500">2026-02-18</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">87%</span>
            <StatusBadge status="Detected" />
          </div>

        </div>

      </div>
    </div>
  );
}