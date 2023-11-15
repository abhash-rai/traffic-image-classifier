from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

import tensorflow as tf
import os

# Custom modules:
from modules.cropper import crop_and_save_image
from modules.image_preprocessor import preprocess_image
from modules.make_prediction import make_predict
from modules.generate_charts import create_charts




model_path = '../traffic_classifier.h5'
model = tf.keras.models.load_model(model_path)



temp_folder = 'temp'
if not os.path.exists(temp_folder):
    os.makedirs(temp_folder)

image_path = './temp/orignal.jpg'
processed_path = './temp/processed.jpg'
cropped_path = './temp/cropped.jpg'
prediction_radar_chart = './temp/radar_chart.png'
prediction_bar_chart = './temp/bar_chart.png'






app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)





@app.post("/upload")
async def upload_image(image: UploadFile):
    # Process and store the uploaded image, e.g., save it to a specific location
    with open(image_path, "wb") as f:
        f.write(image.file.read())
    print('[Recieved] Raw image recieved')
    return {"message": "Image recieved and saved successfully"}





@app.post("/crop")
async def process_image_and_make_prediction(x: int, y: int, height: int, width: int):

    # Recieving Cropping data and cropping stored orignal image
    crop_and_save_image(
        image_path = image_path,
        x = x,
        y = y,
        height = height,
        width = width,
        output_path = cropped_path
    )
    print('[Cropped] Raw image cropped to 1 aspect ratio')

    # Resizing to 300X300px:
    preprocess_image(
        image_path = cropped_path, 
        output_path = processed_path
    )
    print('[Resize] Cropped image resized to 300 by 300 px')

    # Preprocessed image -> normalized pixels using 1/255 -> Make predictions
    predictions_list, labels, predicted_class, predicted_confidence = make_predict(
        image_path = processed_path, 
        model = model
    )
    print(f'[Prediction] Prediction successful: {predicted_class}, {predicted_confidence:.3f}')

    # Creating prediction chart
    create_charts(
        probability = predictions_list, 
        save_path = temp_folder, 
        classes = labels
    )
    print(f'[Report] Generated radar and bar chart')


    # Creating the response dictionary
    predictionData = {label: float(prediction_confidence) for label, prediction_confidence in zip(labels, predictions_list)}
    predictionData['confident_class'] = predicted_class

    return predictionData




@app.get("/get_processed_image")
async def get_image():
    print('[Sent] Processed image sending')
    return FileResponse(processed_path)

@app.get("/get_radar_chart")
async def get_image():
    print('[Sent] Radar chart sending')
    return FileResponse(prediction_radar_chart)

@app.get("/get_bar_chart")
async def get_image():
    print('[Sent] Bar chart sending')
    return FileResponse(prediction_bar_chart)