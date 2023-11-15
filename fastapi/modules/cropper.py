from PIL import Image

def crop_and_save_image(image_path, x, y, height, width, output_path):
    try:
        # Open the image using PIL
        image = Image.open(image_path)

        # Verify the dimensions
        img_width, img_height = image.size

        if x < 0 or x >= img_width or y < 0 or y >= img_height:
            raise ValueError("Invalid starting coordinates (x, y)")

        if width <= 0 or height <= 0 or x + width > img_width or y + height > img_height:
            raise ValueError("Invalid dimensions (width, height)")

        # Crop the image
        cropped_image = image.crop((x, y, x + width, y + height))

        # Save the cropped image
        cropped_image.save(output_path)
    except Exception as e:
        print(f"An error occurred: {e}")