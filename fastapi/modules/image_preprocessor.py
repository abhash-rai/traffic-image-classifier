import cv2
import numpy as np

def preprocess_image(image_path: str, output_path: str):
    '''
    This function takes a colored (3 channel - rgb) image and performs two main operations:
        - Converts the image to grayscale, resulting in a single-channel image.
        - Duplicates the single-channel image into three channels.
    '''

    image = cv2.imread(image_path)

    # Resize the image to 300X300 pixels
    resized_image = cv2.resize(image, (300, 300))

    # Save the resulting image to the specified output path
    cv2.imwrite(output_path, resized_image)
