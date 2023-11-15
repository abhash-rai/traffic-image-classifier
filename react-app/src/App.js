import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import MainContext from "./Components/MainContext";

import Upload from "./Pages/Upload";
import Crop from "./Pages/Crop";
import Result from "./Pages/Result";
import LoadingScreen from "./Components/LoadingScreen";

function App() {
  const [rawImage, setRawImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const [radarChart, setRadarChart] = useState(null);
  const [barChart, setBarChart] = useState(null);

  const [predictionData, setPredictionData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const text_headers = "text-[15px] lg:text-[18px] xl:text-[20px]";
  const text_normal = "text-[13px] lg:text-[16px] xl:text-[18px]";
  const box_classes = "bg-[#24272d] shadow-xl";

  const notebook_link =
    "https://www.kaggle.com/code/abhashrai/classifying-traffic-95-accuracy-cnn-xception/";

  console.log(predictionData);

  return (
    <div className="App w-full relative">
      <MainContext.Provider
        value={{
          notebook_link,
          text_headers,
          text_normal,
          box_classes,
          rawImage,
          setRawImage,
          processedImage,
          setProcessedImage,
          radarChart,
          setRadarChart,
          barChart,
          setBarChart,
          isLoading,
          setIsLoading,
          predictionData,
          setPredictionData,
        }}
      >
        {isLoading && <LoadingScreen />}
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Upload />} />

            <Route path="/crop" element={<Crop />} />

            <Route path="/result" element={<Result />} />
          </Routes>
        </BrowserRouter>
      </MainContext.Provider>
    </div>
  );
}

export default App;
