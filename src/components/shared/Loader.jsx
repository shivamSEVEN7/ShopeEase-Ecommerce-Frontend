import { MoonLoader } from "react-spinners";

const Loader = ({ text, fullScreen = false }) => {
  return (
    <div className={`flex justify-center items-center w-full  h-[450px]`}>
      <div className="flex flex-col items-center gap-3">
        <MoonLoader color="#36d7b7" size={60} />
        <p className="text-slate-600 font-medium animate-pulse">
          {text ? text : "Please wait...."}
        </p>
      </div>
    </div>
  );
};

export default Loader;
