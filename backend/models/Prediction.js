import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    imagePath: String,
    eye: {
      type: String,
      enum: ["left", "right"], //  REQUIRED BY YOU
    },
    prediction: {
      type: String,
      enum: ["Normal", "Glaucoma"],
    },
    confidence: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Prediction", predictionSchema);
