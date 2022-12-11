import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Images from "../images/Images";
import { apiURL } from "../config/config";
import Review from "./bookDetail/review/Review";
import { HeartOutlined } from "@ant-design/icons";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/book/book-slice";
import { toast } from "react-toastify";
const BookDetail = () => {
  const { user } = useSelector((state) => state.auth);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const cart = useSelector((state) => state.book);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${apiURL}/books/${slug}`);
      setData(response.data);
    }
    fetchData();
  }, []);
  if (!data) {
    return;
  }
  console.log(data);
  function handleAddCart() {
    if (!user) {
      toast.error("You need to log in to use this feature!", {
        pauseOnHover: false,
        autoClose: 1000,
        progressClassName: "bg-error",
      });
    } else {
      dispatch(
        add({
          ...data,
        })
      );
    }
  }

  return (
    <>
      <div className="flex justify-between gap-5">
        <Button to="/Library">Back</Button>
      </div>
      <div className="grid grid-cols-4 gap-10 bg-lightGray py-10 px-5">
        <div className="text-center">
          <img
            className="mx-auto box-shadow-creative-large mb-5"
            src={data.image || Images.logo}
            alt=""
          />
          <div className="flex items-center justify-center gap-5">
            <Button onClick={handleAddCart} primary>
              Add to Cart
            </Button>
            <HeartOutlined className="text-xl" />
          </div>
        </div>
        <div className="col-span-3">
          <h4 className="text-3xl font-semibold ">{data.name}</h4>
          <p className="italic">
            by <span className="text-blue-400">{data.author}</span>{" "}
          </p>
          <p>{data.description}</p>
          <hr className="my-5" />

          <Review id={data._id}></Review>
        </div>
      </div>
    </>
  );
};

export default BookDetail;
