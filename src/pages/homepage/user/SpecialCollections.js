import React from "react";
import specialCollectionsData from "../../../data/specialCollectionsData";
const SpecialCollections = () => {
  return (
    <div className="text-center p-10">
      <h4 className="text-primary font-bold text-2xl">Our Special</h4>
      <p className="text-[140px] leading-none stroke-text mb-5">Collections</p>
      <div className="flex gap-8">
        {specialCollectionsData.map((item) => (
          <div className="flex-1 flex flex-col items-center" key={item.title}>
            <img
              src={item.image}
              className="w-full h-[300px] object-cover rounded-xl"
              alt=""
            />
            <div className="bg-white w-[80%] flex-1 -translate-y-6 p-3 text-left box-shadow-creative">
              <h4 className='font-semibold text-primary text-lg'>{item.title}</h4>
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialCollections;
