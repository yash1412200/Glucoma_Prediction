import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UploadCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center space-y-5 shadow-sm">

      <div className="flex justify-center">
        <div className="p-4 bg-teal-50 rounded-xl">
          <Upload className="text-teal-600" size={24} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold">
          Upload a Fundus Image
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Drag & drop or click to upload a retinal image for analysis
        </p>
      </div>

      <Button className="bg-teal-600 hover:bg-teal-700 text-white">
        Upload Image
      </Button>

    </div>
  );
}