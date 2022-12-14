import React from "react";
import quickLinksData from "../../../data/quickLinksData";
import Images from "../../../images/Images";
import { v4 } from "uuid";
const QuickkLinks = () => {
  return (
    <div className="w-full relative flex flex-col items-center ">
      <img src={Images.quickLinks} className="w-full" alt="" />
      <div className="flex gap-10 absolute left-0 top-0 px-10 py-5 hover:py-20 duration-100 right-0 bg-primary bg-opacity-80 quickLink-container">
        <p>
          <h4 className="text-white font-bold text-2xl pt-4 border-b-2 ">
            Quicklinks
          </h4>
        </p>
        <div className="flex flex-1 duration-100 gap-5 justify-between quickLink-list opacity-0 -translate-y-5">
          {quickLinksData.map((item) => (
            <span
              className="border-l-2 duration-200 border-secondary pl-1 py-4 hover:bg-secondary text-white flex justify-center items-center flex-1"
              key={v4()}
            >
              {item.title}
            </span>
          ))}
        </div>
      </div>
      <div className=" bg-secondary text-white bg-opacity-80 text-2xl px-5 py-10 -translate-y-1/2 font-semibold">
        Discover Special Collection
      </div>
    </div>
  );
};

export default QuickkLinks;
