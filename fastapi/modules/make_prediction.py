import tensorflow as tf
import numpy as np
import cv2

def make_predict(image_path, model):
    """
    Predicts traffic congestion level for the input image.

    Returns:
        tuple: (Prediction Label, Confidence Probability)
    """

    image = cv2.imread(image_path) # Reading image
    image = image.reshape((-1, 300, 300, 3)) # Reshaping

    labels = ['congested_traffic', 'heavy_traffic', 'light_traffic', 'moderate_traffic', 'traffic_unrelated']

    prediction = model.predict(image)
    predictions_list = list(prediction[0])

    index = np.argmax(predictions_list)
    predicted_class = labels[index]
    predicted_confidence = predictions_list[index]

    return predictions_list, labels, predicted_class, predicted_confidence