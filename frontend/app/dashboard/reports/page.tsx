"use client";

import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { getReportsApi } from "@/lib/user";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReportsApi();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleDownload = async (report: any) => {
    const doc = new jsPDF();

    const toBase64 = async (url: string) => {
      const res = await fetch(url);
      const blob = await res.blob();

      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    };

    const imageBase64 = await toBase64(report.imagePath);

    /* ---------------- HEADER ---------------- */
    doc.setFontSize(18);
    doc.text("Glaucoma AI Detection Report", 20, 20);

    /* ---------------- IMAGES ---------------- */
    doc.setFontSize(12);
    doc.text("Retinal Images", 20, 35);

    // Original Image
    doc.text("Original", 20, 45);
    doc.addImage(imageBase64, "JPEG", 20, 50, 75, 60);

    // Analyzed Image (same for now)
    doc.text("Analyzed", 115, 45);
    doc.addImage(imageBase64, "JPEG", 115, 50, 75, 60);

    /* ---------------- DIAGNOSTIC BOX ---------------- */
    doc.setDrawColor(200);
    doc.rect(20, 120, 170, 30);

    doc.setFontSize(13);
    doc.text("Diagnostic Assessment", 25, 130);

    doc.setFontSize(11);

    const statusText =
      report.prediction === "Normal"
        ? "No signs of glaucoma detected"
        : "Signs of glaucoma detected";

    doc.text(statusText, 25, 140);

    doc.text(`${(report.confidence * 100).toFixed(1)}% Confidence`, 25, 147);

    /* ---------------- DETAILS ---------------- */
    doc.setFontSize(12);

    doc.text(
      `Eye: ${report.eye === "left" ? "Left Eye" : "Right Eye"}`,
      20,
      165,
    );

    doc.text(
      `Date: ${new Date(report.createdAt).toLocaleDateString()}`,
      20,
      175,
    );

    /* ---------------- RECOMMENDATIONS ---------------- */
    doc.setFontSize(14);
    doc.text("Recommendations", 20, 195);

    doc.setFontSize(11);

    if (report.prediction === "Normal") {
      doc.text("✔ Maintain regular eye check-ups.", 20, 205);
      doc.text("✔ No immediate action needed.", 20, 212);
    } else {
      doc.text("⚠ Consult an ophthalmologist immediately.", 20, 205);
      doc.text("⚠ Further clinical evaluation recommended.", 20, 212);
    }

    /* ---------------- DISCLAIMER ---------------- */
    doc.setTextColor(200, 120, 0);
    doc.setFontSize(10);

    doc.text(
      "⚠ This is an AI-based screening tool. Results should be confirmed by a medical professional.",
      20,
      230,
      { maxWidth: 160 },
    );

    /* ---------------- SAVE ---------------- */
    doc.save(`glaucoma-report-${report._id}.pdf`);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold">Reports</h2>

      {loading && <p className="text-sm text-gray-500">Loading reports...</p>}

      {!loading && reports.length === 0 && (
        <p className="text-sm text-gray-500">No reports available</p>
      )}

      {/* Desktop List */}
      <div className="hidden sm:block bg-white rounded-2xl border border-gray-100 shadow-sm divide-y">
        {reports.map((report) => (
          <div
            key={report._id}
            className="p-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-gray-500" />

              <div>
                <p className="text-sm font-medium">
                  {report.eye === "left" ? "Left Eye Scan" : "Right Eye Scan"}
                </p>

                <p className="text-xs text-gray-500">
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>

                <p className="text-xs text-gray-400">
                  Confidence: {(report.confidence * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <StatusBadge
                status={report.prediction === "Normal" ? "Normal" : "Detected"}
              />

              <Button
                onClick={() => handleDownload(report)}
                className="bg-gray-900 hover:bg-black text-white text-xs"
              >
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 sm:hidden">
        {reports.map((report) => (
          <div
            key={report._id}
            className="bg-white border rounded-xl p-4 shadow-sm space-y-3"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-gray-500" />

                <p className="text-sm font-medium">
                  {report.eye === "left" ? "Left Eye Scan" : "Right Eye Scan"}
                </p>
              </div>

              <StatusBadge
                status={report.prediction === "Normal" ? "Normal" : "Detected"}
              />
            </div>

            <p className="text-xs text-gray-500">
              Date: {new Date(report.createdAt).toLocaleDateString()}
            </p>

            <p className="text-xs text-gray-400">
              Confidence: {(report.confidence * 100).toFixed(1)}%
            </p>

            <Button
              onClick={() => handleDownload(report)}
              className="w-full bg-gray-900 hover:bg-black text-white text-xs"
            >
              Download Report
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
