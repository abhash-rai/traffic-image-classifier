import React, { useContext, useState } from "react";
import Cropper from "react-easy-crop";
import { useNavigate } from "react-router-dom";
import MainContext from "../Components/MainContext";
import axios from "../Components/MainAxios";

const Crop = () => {
  const {
    text_headers,
    rawImage,
    setProcessedImage,
    setRadarChart,
    setBarChart,
    setIsLoading,
    setPredictionData,
  } = useContext(MainContext);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const navigate = useNavigate();

  const fetchImageAndConvertToBase64 = async (url, setStateFunction) => {
    try {
      const response = await axios.get(url, {
        responseType: "arraybuffer",
      });
      const blob = new Blob([response.data], { type: "image/jpeg" });
      const reader = new FileReader();

      reader.onload = function () {
        const base64Image = reader.result;
        setStateFunction(base64Image);
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error fetching the image:", error);
    }
  };

  const confirmCrop = async () => {
    setIsLoading(true);

    try {
      const cropData = {
        x: croppedAreaPixels.x,
        y: croppedAreaPixels.y,
        height: croppedAreaPixels.height,
        width: croppedAreaPixels.width,
      };

      const cropResponse = await axios.post("/crop", null, {
        params: cropData,
      });
      console.log(
        "Crop information successfully sent to the server:",
        cropResponse.data
      );

      setPredictionData(cropResponse.data);
    } catch (error) {
      console.error("Error sending crop information:", error);
    }

    fetchImageAndConvertToBase64("/get_processed_image", setProcessedImage);
    fetchImageAndConvertToBase64("/get_radar_chart", setRadarChart);
    fetchImageAndConvertToBase64("/get_bar_chart", setBarChart);

    navigate("/result");
    setIsLoading(false);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedArea);
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropCancel = () => {
    setCroppedArea(null);
    setCroppedAreaPixels(null);
    navigate("/");
  };

  return (
    <div className="crop container mx-auto w-full h-[100vh] flex flex-col pt-4 gap-3">
      <div className="relative w-1full h-[88%]">
        <Cropper
          image={URL.createObjectURL(rawImage)}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div
        className={`${text_headers} font-bold h-[12%] p-3 flex flex-row gap-5 justify-center`}
      >
        <div className="bg-[#007AFF] flex justify-center items-center p-2 text-center text-white w-[45%] md:w-[250px] hover:scale-110 transition-transform duration-50">
          <button onClick={confirmCrop}>Confirm Crop</button>
        </div>
        <div className="bg-[#FF0000] flex justify-center items-center p-2 text-center text-white w-[45%] md:w-[250px] hover:scale-110 transition-transform duration-50">
          <button onClick={handleCropCancel}>Choose Another</button>
        </div>
      </div>
    </div>
  );
};

export default Crop;
