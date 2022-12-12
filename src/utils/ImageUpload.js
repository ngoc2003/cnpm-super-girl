import axios from "axios";
import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { imgbbAPI } from "../config/config.js";
const ImageUpload = ({ onChange = () => {}, name = "" }) => {
  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    const response = await axios({
      method: "post",
      url: imgbbAPI,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data.data.url)
    onChange(response.data.data.url);
  };
  return (
    <>
      <Input onChange={handleChange} isFile></Input>
    </>
  );
};

export default ImageUpload;
