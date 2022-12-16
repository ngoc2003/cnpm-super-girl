import React from "react";
import { Link } from "react-router-dom";
const Book = ({ data, to}) => {
  const components = (
    <div className="h-[380px]   overflow-hidden relative ">
      <div className=" justify-center flex flex-col items-center">
        <div className="  h-[300px] ">
          <img src={data.image} className="h-full object-cover " alt="" />
        </div>
        <h4 className="text-primary font-semibold my-1">{data.name}</h4>
        <p className="text-sm">{data.author}</p>
      </div>
    </div>
  );
  return <>{to ? <Link to={to}>{components}</Link> : components}</>;
};

export default Book;
