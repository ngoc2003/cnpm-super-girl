import React from "react";
import Images from "../../../../images/Images";
import { Rate } from "antd";
const ReviewItem = ({ data }) => {
  return (
    <div className="bg-white p-3 my-3">
      <div className="flex gap-5 mb-1">
        <img
          className="w-10 h-10 object-cover rounded-full"
          src={data?.image || Images.avatar}
          alt=""
        />

        <div>
          <h4>{data.userName}</h4>
          <Rate disabled defaultValue={data.star} />
        </div>
      </div>
      <p>{data.review}</p>
    </div>
  );
};

export default ReviewItem;
