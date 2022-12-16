import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Images from "../images/Images";
import { apiURL } from "../config/config";
import {
  HeartOutlined,
  HeartFilled,
  StarFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
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
          <div className="flex gap-5 items-center">
            Rate
            <StarFilled className="text-secondary" />
            <StarFilled className="text-secondary" />
            <StarFilled className="text-secondary" />
            <StarFilled className="text-secondary" />
            <span className="text-">(x comments)</span>
          </div>
          <div>
            <div className="bg-white p-3 my-3">
              <div className="flex gap-5 mb-1">
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  src={Images.avatar}
                  alt=""
                />
                <h4>{"anonymous"}</h4>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum eleifend porta tortor vitae rutrum. Class aptent
                taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Mauris pharetra pharetra metus id placerat.
                Aenean hendrerit hendrerit lacinia. In hac habitasse platea
                dictumst.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetail;
