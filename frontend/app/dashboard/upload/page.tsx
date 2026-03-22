"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { predictEyeApi } from "@/lib/predict";
import jsPDF from "jspdf";

/* ---------------- TYPE ---------------- */

type PredictionResult = {
  status: "Normal" | "Glaucoma Detected";
  confidence: number;
};

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [eye, setEye] = useState<"left" | "right" | "">("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  /* ---------------- FILE CHANGE ---------------- */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  /* ---------------- ANALYZE ---------------- */

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please select an image first.");
      return;
    }

    if (!eye) {
      toast.error("Please select left or right eye");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const res = await predictEyeApi(file, eye);

      const prediction: PredictionResult = {
        status:
          res.data.prediction === "Normal" ? "Normal" : "Glaucoma Detected",
        confidence: res.data.confidence,
      };

      setResult(prediction);
      toast.success("Image analyzed successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to analyze image");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!result || !file) return;

    const doc = new jsPDF();

    // Convert uploaded file to base64
    const toBase64 = (file: File) =>
      new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

    const imageBase64 = await toBase64(file);

    /* ---------------- HEADER ---------------- */
    doc.setFontSize(18);
    doc.text("Glaucoma AI Detection Report", 20, 20);

    /* ---------------- IMAGES ---------------- */
    doc.setFontSize(12);
    doc.text("Retinal Images", 20, 35);

    // Original
    doc.text("Original", 20, 45);
    doc.addImage(imageBase64, "JPEG", 20, 50, 75, 60);

    // Analyzed (same for now)
    doc.text("Analyzed", 115, 45);
    doc.addImage(imageBase64, "JPEG", 115, 50, 75, 60);

    /* ---------------- DIAGNOSTIC BOX ---------------- */
    doc.setDrawColor(200);
    doc.rect(20, 120, 170, 30);

    doc.setFontSize(13);
    doc.text("Diagnostic Assessment", 25, 130);

    doc.setFontSize(11);

    const statusText =
      result.status === "Normal"
        ? "No signs of glaucoma detected"
        : "Signs of glaucoma detected";

    doc.text(statusText, 25, 140);
    doc.text(`${result.confidence}% Confidence`, 25, 147);

    /* ---------------- DETAILS ---------------- */
    doc.setFontSize(12);

    doc.text(`Eye: ${eye.toUpperCase()}`, 20, 165);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 175);

    /* ---------------- RECOMMENDATIONS ---------------- */
    doc.setFontSize(14);
    doc.text("Recommendations", 20, 195);

    doc.setFontSize(11);

    if (result.status === "Normal") {
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
    doc.save("glaucoma-report.pdf");
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold">Upload Image</h2>

      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-sm text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-5 bg-teal-50 rounded-xl">
            <Upload className="text-teal-600" size={28} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Upload Retinal Fundus Image</h3>
          <p className="text-sm text-gray-500 mt-1">
            Only JPG, PNG formats supported. Max size 5MB.
          </p>
        </div>

        {/* Eye Selection */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setEye("left")}
            className={`px-4 py-2 rounded-lg border text-sm transition ${
              eye === "left"
                ? "bg-teal-600 text-white"
                : "bg-white text-slate-600"
            }`}
          >
            Left Eye
          </button>

          <button
            onClick={() => setEye("right")}
            className={`px-4 py-2 rounded-lg border text-sm transition ${
              eye === "right"
                ? "bg-teal-600 text-white"
                : "bg-white text-slate-600"
            }`}
          >
            Right Eye
          </button>
        </div>

        {/* Hidden Input */}
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />

        <div className="space-y-3">
          <label htmlFor="fileInput">
            <Button
              type="button"
              className="bg-teal-600 hover:bg-teal-700 text-white"
              asChild
            >
              <span>Select Image</span>
            </Button>
          </label>

          {file && (
            <p className="text-xs text-gray-500 break-all">
              Selected: {file.name}
            </p>
          )}

          {file && (
            <Button
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-slate-800 hover:bg-slate-900 text-white"
            >
              {loading ? "Processing..." : "Analyze Image"}
            </Button>
          )}
        </div>
      </div>

      {/* Result Section */}
      {result && (
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
            Prediction Result
          </h3>

          <div className="flex justify-between text-sm">
            <span>Status:</span>
            <span
              className={
                result.status === "Normal"
                  ? "text-green-600 font-medium"
                  : "text-red-600 font-medium"
              }
            >
              {result.status}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Confidence:</span>
            <span className="font-medium">{result.confidence}%</span>
          </div>

          <div className="text-xs text-slate-500">Eye: {eye.toUpperCase()}</div>

          <Button
            onClick={handleDownload}
            className="mt-3 bg-gray-900 hover:bg-black text-white text-sm"
          >
            Download Report
          </Button>
        </div>
      )}
    </div>
  );
}
