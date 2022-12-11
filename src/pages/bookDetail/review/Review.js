import React, { useState, useEffect } from "react";
import FormGroup from "../../../components/FormGroup";
import Label from "../../../components/Label";
import TextAreaInput from "../../../components/TextAreaInput";
import ReviewItem from "./item";
import Button from "../../../components/Button";
import axios from "axios";
import { apiURL } from "../../../config/config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Rate } from "antd";
const Review = ({ id }) => {
  const [commentValue, setCommentValue] = useState("");
  const [reviews, setReview] = useState("");
  const [star, setStar] = useState(4);
  const [average, setAverage] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const handleSetComment = (e) => {
    setCommentValue(e.target.value);
  };
  const handleSubmit = async () => {
    if (!user) {
      toast.error("You need to sign in first", {
        pauseOnHover: false,
        autoClose: 1500,
      });
    } else if (!commentValue) {
      toast.error("Your comment is empty baby!", {
        pauseOnHover: false,
        autoClose: 1500,
      });
    } else {
      await axios
        .post(`${apiURL}/review/create`, {
          bookId: id,
          userId: user._id,
          review: commentValue,
          star: star,
        })
        .then(() => {
          toast.success("Comment success", {
            pauseOnHover: false,
            autoClose: 1500,
          });
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleStar = (num) => {
    setStar(num);
  };
  const fetchComment = async () => {
    const response = await axios.get(`${apiURL}/review/${id}`);
    setReview(response.data);
  };
  useEffect(() => {
    fetchComment();
    // const totalStar = (reviews || [])
    //   .map((item) => parseInt(item.star))
    //   .reduce((total, val) => total + val, 0);
    // setAverage(parseInt(totalStar / reviews.length));
  }, []);
  return (
    <>
      <div className="flex gap-5 items-center">
        {/* <Rate disabled defaultValue={!!average && parseInt(average)} /> */}
        <span className="text-">({reviews.length} comments)</span>
      </div>
      <div className="bg-white p-3 my-5 pt-5">
        <FormGroup>
          <Label>Put your star below</Label>
          <Rate defaultValue={star} onChange={handleStar} />
        </FormGroup>
        <FormGroup>
          <Label>Put your comment below</Label>
          <TextAreaInput onChange={handleSetComment} row={5}></TextAreaInput>
          <Button onClick={handleSubmit} primary>
            Up!
          </Button>
        </FormGroup>
        <div>
          {!!reviews.length &&
            reviews.map((item) => (
              <ReviewItem key={item._id} data={item}></ReviewItem>
            ))}
        </div>
      </div>
    </>
  );
};

export default Review;
