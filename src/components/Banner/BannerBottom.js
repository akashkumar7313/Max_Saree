import React from "react";
import { MdLocalShipping } from "react-icons/md";
import { CgRedo } from "react-icons/cg";

const BannerBottom = () => {
  return (
    <div className="w-full bg-white border-b-[1px] py-1 border-b-gray-900 px-8">
      <div className="max-w-container sm:m-2 mx-auto h-20 mb-20 sm:mb-24 md:mb-0 lg:mb-0 flex flex-col md:flex-row justify-between items-center">
      <div className="flex md:w-auto items-center gap-2 bg-red-300 hover:bg-green-500 rounded-[10px] mb-2 sm:mb-3 md:mb-0 lg:mb-0 p-3 w-72 shadow-sm hover:shadow-md duration-300">
          <p className="text-black font-semibold hover:text-white text-base">Two years warranty</p>
        </div>
        <div className="flex md:w-auto items-center gap-2 bg-red-300 hover:bg-green-500 rounded-[10px] mb-2 sm:mb-3 md:mb-0 lg:mb-0 p-3 w-72 shadow-sm hover:shadow-md duration-300">
          <span className="text-xl text-center w-6 ml-1">
            <MdLocalShipping />
          </span>
          <p className="text-black font-semibold hover:text-white text-base">Free shipping</p>
        </div>
        <div className="flex md:w-auto items-center bg-red-300 rounded-[10px] hover:bg-green-500 p-3 gap-2 w-72 shadow-sm hover:shadow-md duration-300">
          <span className="text-2xl text-center w-6">
            <CgRedo />
          </span>
          <p className="text-black font-semibold hover:text-white text-base">Return policy in 30 days</p>
        </div>
      </div>
    </div>
  );
};

export default BannerBottom;
