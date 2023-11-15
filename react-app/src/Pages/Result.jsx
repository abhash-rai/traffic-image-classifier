import { useContext } from "react";
import MainContext from "../Components/MainContext";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const {
    notebook_link,
    text_headers,
    text_normal,
    box_classes,
    processedImage,
    radarChart,
    barChart,
    predictionData,
  } = useContext(MainContext);

  const navigate = useNavigate();

  const handleMakeAnotherPredictionButton = () => {
    navigate("/");
  };

  return (
    <div className="result container mx-auto p-5 flex flex-col gap-6 shadow-xl">
      <div className="w-full h-[15%] flex justify-center items-center text-center">
        <div className={`font-bold ${text_headers}`}>
          Training details:{" "}
          <a
            href={notebook_link}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-green`}
          >
            Traffic Image Classification Notebook
          </a>
        </div>
      </div>
      <div
        className={`h-[85%] flex flex-col md:flex-row bg-[#222328] border-blue border-y-2`}
      >
        <div
          className={`${text_normal} w-full md:w-[36%] lg:w-[32%] xl:w-[34%] p-8 h-full my-auto`}
        >
          <div className={`${box_classes} h-full flex flex-col gap-10 py-7`}>
            <div className={`flex flex-row gap-3 md:gap-1 lg:gap-3 px-8`}>
              <div
                style={{
                  transform: "skew(-20deg)",
                }}
                className={`${text_headers} w-[80%] bg-[#202731] border-blue border-[1px] text-center py-1 font-bold`}
              >
                Traffic Classifier
              </div>
              <div
                style={{
                  transform: "skew(-20deg)",
                }}
                className="w-[10%] bg-[#202731] border-blue border-[1px]"
              ></div>
              <div
                style={{
                  transform: "skew(-20deg)",
                }}
                className="w-[10%] bg-[#202731] border-blue border-[1px]"
              ></div>
            </div>
            <div className="flex flex-col px-6 justify-center items-center">
              <img
                className="w-full xl:w-[300px]"
                src={processedImage}
                alt="modelInputImage"
              />
              <div className="text-center">
                Model's Input Image:{" "}
                <span className="opacity-50">300X300px</span>
              </div>
            </div>
            <div className="px-8"></div>
            <div className="px-8">
              <button
                onClick={handleMakeAnotherPredictionButton}
                className={`${text_headers} w-full bg-red p-4 rounded-3xl flex justify-center items-center text-center font-bold hover:scale-110 transition-all duration-300 ease-in-out`}
              >
                Make Another Prediction
              </button>
            </div>
          </div>
        </div>
        <div
          className={`w-full md-[30%] lg:w-[40%] flex flex-col justify-center items-center gap-8 py-8 px-8 md:pl-8 md:pr-0 border-blue border-l-2`}
        >
          <div className={`p-4 ${box_classes} shadow-xl`}>
            <img src={radarChart} alt="test" />
          </div>
          <div className={`p-4 ${box_classes} shadow-xl`}>
            <img src={barChart} alt="test" />
          </div>
        </div>
        <div className="w-full md:w-[34%] lg:w-[28%] xl:w-[26%] flex flex-col gap-8 p-8 justify-center">
          <div className="font-bold bg-[#21373e92] rounded-[40px] border-blue border-y-4 p-4">
            <div className={`text-center ${text_headers}`}>Given image is</div>
            <div className={`text-center ${text_headers} text-green`}>
              ➤ {predictionData.confident_class}
            </div>
          </div>
          <div
            className={`${box_classes} ${text_normal} p-8 flex flex-col justify-center w-full gap-4 lg:gap-7 xl:gap-16 h-full`}
          >
            <div className="w-auto mx-auto flex flex-col gap-3">
              <div className="">traffic_unrelated</div>
              <div
                className={`ml-5 flex flex-row gap-10 ${
                  predictionData.confident_class === "traffic_unrelated"
                    ? "text-green"
                    : ""
                }`}
              >
                <div className="">
                  {predictionData.traffic_unrelated.toFixed(3)}
                </div>
                <div className="">
                  {(predictionData.traffic_unrelated * 100).toFixed(3)}%
                </div>
              </div>
            </div>
            <div className="w-auto mx-auto flex flex-col gap-3">
              <div className="">congested_traffic</div>
              <div
                className={`ml-5 flex flex-row gap-10 ${
                  predictionData.confident_class === "congested_traffic"
                    ? "text-green"
                    : ""
                }`}
              >
                <div className="">
                  {predictionData.congested_traffic.toFixed(3)}
                </div>
                <div className="">
                  {(predictionData.congested_traffic * 100).toFixed(3)}%
                </div>
              </div>
            </div>
            <div className="w-auto mx-auto flex flex-col gap-3">
              <div className="">heavy_traffic</div>
              <div
                className={`ml-5 flex flex-row gap-10 ${
                  predictionData.confident_class === "heavy_traffic"
                    ? "text-green"
                    : ""
                }`}
              >
                <div className="">
                  {predictionData.heavy_traffic.toFixed(3)}
                </div>
                <div className="">
                  {(predictionData.heavy_traffic * 100).toFixed(3)}%
                </div>
              </div>
            </div>
            <div className="w-auto mx-auto flex flex-col gap-3">
              <div className="">moderate_traffic</div>
              <div
                className={`ml-5 flex flex-row gap-10 ${
                  predictionData.confident_class === "moderate_traffic"
                    ? "text-green"
                    : ""
                }`}
              >
                <div className="">
                  {predictionData.moderate_traffic.toFixed(3)}
                </div>
                <div className="">
                  {(predictionData.moderate_traffic * 100).toFixed(3)}%
                </div>
              </div>
            </div>
            <div className="w-auto mx-auto flex flex-col gap-3">
              <div className="">light_traffic</div>
              <div
                className={`ml-5 flex flex-row gap-10 ${
                  predictionData.confident_class === "light_traffic"
                    ? "text-green"
                    : ""
                }`}
              >
                <div className="">
                  {predictionData.light_traffic.toFixed(3)}
                </div>
                <div className="">
                  {(predictionData.light_traffic * 100).toFixed(3)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
