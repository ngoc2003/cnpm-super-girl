import React from "react";

const Book = ({ data }) => {
  console.log(data);
  return (
    <div className="h-[400px]   overflow-hidden ">
      <div className=" justify-center flex flex-col items-center">
        <div className="  h-[300px] ">
          <img src={data.image} className="h-full object-cover " alt="" />
        </div>
        <h4 className="text-primary font-semibold my-1">{data.name}</h4>
        <p className="text-sm">{data.author}</p>
      </div>
    </div>
  );
};

export default Book;
