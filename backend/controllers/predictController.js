import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import Prediction from "../models/Prediction.js";
import Settings from "../models/Settings.js";
import { sendGlaucomaAlert } from "../utils/sendEmail.js";

export const predictEye = async (req, res) => {
  try {
    const { eye } = req.body;

    if (!eye) {
      return res.status(400).json({
        message: "Eye type (left or right) is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    /* ===============================
       GET SYSTEM SETTINGS
    =============================== */

    const settings = await Settings.findOne();

    /* ===============================
       CHECK UPLOAD LIMIT
    =============================== */

    const fileSizeMB = req.file.size / (1024 * 1024);

    if (settings && fileSizeMB > settings.uploadLimit) {
      fs.unlinkSync(req.file.path);

      return res.status(400).json({
        message: `File exceeds ${settings.uploadLimit}MB limit`,
      });
    }

    /* ===============================
       SEND IMAGE TO AI MODEL
    =============================== */

    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));

    const aiResponse = await axios.post(
      `${process.env.AI_BASE_URL}/predict`,
      formData,
      { headers: formData.getHeaders() },
    );

    /* ===============================
       SAVE PREDICTION
    =============================== */

    const savedPrediction = await Prediction.create({
      userId: req.user.id,
      imagePath: req.file.path,
      eye,
      prediction: aiResponse.data.prediction,
      confidence: aiResponse.data.confidence,
    });

    /* ===============================
       EMAIL NOTIFICATION
    =============================== */

    if (
      settings?.emailNotifications &&
      aiResponse.data.prediction === "Glaucoma"
    ) {
      await sendGlaucomaAlert(
        req.user.email,
        "⚠ Glaucoma Risk Detected",
        "AI detected possible glaucoma in your retinal scan.",
      );
    }

    fs.unlinkSync(req.file.path);

    res.json({
      message: "Prediction successful",
      data: savedPrediction,
    });
  } catch (error) {
    console.error("PREDICT ERROR:", error);
    res.status(500).json({ message: "Prediction failed" });
  }
};
