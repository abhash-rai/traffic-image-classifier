import { useContext } from "react";
import MainContext from "../Components/MainContext";
import { FileUploader } from "react-drag-drop-files";
import { useNavigate } from "react-router-dom";
import axios from "../Components/MainAxios";
import logo from "../Logo/logo.png";
import backgroundImg from "../Images/background.png";

const fileTypes = ["PNG", "JPG", "JPEG", "WEBP"];

const Upload = () => {
  const {
    notebook_link,
    text_headers,
    text_normal,
    setRawImage,
    setIsLoading,
  } = useContext(MainContext);

  const navigate = useNavigate();

  const handleImageUpload = async (Image) => {
    setIsLoading(true);
    setRawImage(Image);

    const formData = new FormData();
    formData.append("image", Image); // Append the raw image to the FormData object

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data.message);
      // Redirect to the next step or route as needed
      navigate("/crop"); // Change the route as required
    } catch (error) {
      console.error("Image upload failed: ", error);
    }
    // navigate("/crop");
    setIsLoading(false);
  };

  return (
    <div className="relative !w-full !h-full full-width-container !px-0">
      <div
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          filter: "blur(3px) brightness(40%)",
        }}
        className="absolute w-full h-full xl:h-[100vh]"
      ></div>
      <div className="upload_page p-5 relative w-full flex flex-col gap-5">
        <div className="flex-none flex flex-row items-center gap-2">
          <img className="w-[50px]" src={logo} alt="site logo" />
          <span className="font-bold text-blue text-[30px]">TCC</span>
        </div>
        <div className="flex-1 flex flex-col gap-5 justify-center items-center py-16 text-blue">
          <div className={`${text_headers} font-bold`}>
            Please upload an image to classify
          </div>
          <div className="bg-black rounded-lg hover:scale-105 transition-transform duration-300">
            <FileUploader
              name="Image"
              types={fileTypes}
              onDrop={handleImageUpload}
              onSelect={handleImageUpload}
            />
          </div>
        </div>
        <div
          className={`flex-none ${text_normal} font-semibold flex justify-center items-center text-center`}
        >
          Makes predictions on the following classes:
        </div>
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex flex-col lg:flex-row px-10 bg-[#00000059]">
            <div className="flex-1 p-5 flex flex-col items-center">
              <span className={`${text_normal} font-semibold text-center`}>
                traffic_unrelated:
              </span>{" "}
              <span className={`${text_normal} opacity-60 text-center`}>
                Indicates an absence of traffic related situation
              </span>
            </div>
            <div className="border-t-2 border-l-0 border-blue lg:border-t-0 lg:border-l-2 flex-1 p-5 flex flex-col items-center">
              <span className={`${text_normal} font-semibold text-center`}>
                congested_traffic:
              </span>{" "}
              <span className={`${text_normal} opacity-60 text-center`}>
                Indicates complete standstill caused by congestion or blockages
                or accidents
              </span>
            </div>
            <div className="border-t-2 border-l-0 border-blue lg:border-t-0 lg:border-l-2 flex-1 p-5 flex flex-col items-center">
              <span className={`${text_normal} font-semibold text-center`}>
                heavy_traffic:
              </span>{" "}
              <span className={`${text_normal} opacity-60 text-center`}>
                Indicates high volume of vehicles causing slow moving traffic
                conditions
              </span>
            </div>
            <div className="border-t-2 border-l-0 border-blue lg:border-t-0 lg:border-l-2 flex-1 p-5 flex flex-col items-center">
              <span className={`${text_normal} font-semibold text-center`}>
                moderate_traffic:
              </span>{" "}
              <span className={`${text_normal} opacity-60 text-center`}>
                Indicates moderate or steady flow of traffic with moderate
                number of vehicles
              </span>
            </div>
            <div className="border-t-2 border-l-0 border-blue lg:border-t-0 lg:border-l-2 flex-1 p-5 flex flex-col items-center">
              <span className={`${text_normal} font-semibold text-center`}>
                light_traffic:
              </span>{" "}
              <span className={`${text_normal} opacity-60 text-center`}>
                Indicates minimal or very few vehicles on the road.
              </span>
            </div>
          </div>
          <div
            className={`font-bold ${text_headers} flex justify-center items-center text-center`}
          >
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
      </div>
    </div>
  );
};

export default Upload;
