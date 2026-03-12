import os
os.environ["KERAS_BACKEND"] = "tensorflow"
os.environ["TF_USE_LEGACY_KERAS"] = "1"

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import io
import gdown
import tensorflow as tf
from keras.models import load_model

app = FastAPI(title="Glaucoma Prediction API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root route (FIX for Not Found)
@app.get("/")
def home():
    return {"message": "Glaucoma Prediction API is running"}

MODEL_PATH = "glaucoma_model.h5"

if not os.path.exists(MODEL_PATH):
    print("Downloading AI model...")
    gdown.download(
        "https://drive.google.com/uc?id=19YseWWXkzjxnSylHtFkFM2VRLvYOoqb-",
        MODEL_PATH,
        quiet=False
    )

print("Loading model...")

model = load_model(MODEL_PATH, compile=False)

IMG_SIZE = 224

def preprocess_image(image):
    image = image.resize((IMG_SIZE, IMG_SIZE))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

# @app.post("/predict")
# async def predict(file: UploadFile = File(...)):
#     try:
#         contents = await file.read()
#         image = Image.open(io.BytesIO(contents)).convert("RGB")
#         image = preprocess_image(image)

#         prediction = model.predict(image)

#         # Handle both sigmoid and softmax models
#         if prediction.shape[1] == 1:
#             # Sigmoid output
#             confidence = float(prediction[0][0])
#             result = "Glaucoma" if confidence >= 0.5 else "Normal"

#         else:
#             # Softmax output (2 classes)
#             class_index = np.argmax(prediction[0])
#             confidence = float(np.max(prediction[0]))

#             # Adjust mapping if needed
#             classes = ["Glaucoma", "Normal"]
#             result = classes[class_index]

#         return {
#             "prediction": result,
#             "confidence": round(confidence * 100, 2)
#         }

#     except Exception as e:
#         return {"error": str(e)}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        image = preprocess_image(image)

        prediction = model.predict(image)

        print("RAW PREDICTION:", prediction)
        print("SHAPE:", prediction.shape)

        # ---------------- SIGMOID MODEL (1 output neuron) ----------------
        if prediction.shape[1] == 1:

            prob = float(prediction[0][0])   # probability of class 1
            print("Sigmoid probability:", prob)

            # IMPORTANT:
            # In sigmoid models:
            # prob represents probability of class 1
            # So we MUST know what class 1 was during training.

            # ⚠️ DEFAULT ASSUMPTION:
            # class 0 = Normal
            # class 1 = Glaucoma
            # (change this if needed)

            if prob >= 0.5:
                result = "Glaucoma"
                confidence = prob
            else:
                result = "Normal"
                confidence = 1 - prob

        # ---------------- SOFTMAX MODEL (2 outputs) ----------------
        else:

            probabilities = prediction[0]
            class_index = int(np.argmax(probabilities))
            confidence = float(probabilities[class_index])

            print("Softmax probabilities:", probabilities)
            print("Predicted class index:", class_index)

            # ⚠️ IMPORTANT:
            # Check how your dataset was ordered during training.
            # If folders were:
            #   glaucoma/
            #   non_glaucoma/
            # then alphabetical order = glaucoma (0), non_glaucoma (1)

            classes = ["Glaucoma", "Normal"]  # 🔥 change order if needed

            result = classes[class_index]

        return {
            "prediction": result,
            "confidence": round(confidence, 4)
        }

    except Exception as e:
        return {"error": str(e)}