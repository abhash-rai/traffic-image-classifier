import { useContext } from "react";
import ReactLoading from "react-loading";
import MainContext from "./MainContext";

const LoadingScreen = () => {
  const { text_headers } = useContext(MainContext);

  return (
    <div className="loading bg-[#26272C] w-full h-[100vh] flex flex-col justify-center items-center z-[100] absolute">
      <div className="h-[80%] flex justify-center items-center">
        <ReactLoading
          type={"bars"}
          color={"#03fc4e"}
          height={100}
          width={100}
        />
      </div>
      <div className={`h-[20%] ${text_headers}`}>
        Making prediction can take upto a minute...
      </div>
    </div>
  );
};

export default LoadingScreen;
