import { MoonLoader } from "react-spinners";

const Loader = ({ text }) => {
  return (
    <div className="flex justify-center items-center w-full h-[450px]">
      <div className="flex flex-col items-center gap-1">
        <MoonLoader color="#36d7b7" />
        <p className="text-slate-800">{text ? text : "Please wait...."}</p>
      </div>
    </div>
  );
};

export default Loader;
