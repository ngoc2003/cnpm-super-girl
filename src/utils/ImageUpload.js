import axios from "axios";
import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { imgbbAPI } from "../config/config.js";
const ImageUpload = ({ onChange = () => {}, defaultValue}) => {
  const [imagePreview, setImagePreview] = useState(""); // preview image update
  function handleSetPreview(image) {
    try {
      image.preview = URL.createObjectURL(image);
    } catch (err) {
      console.log(err);
    }
    setImagePreview(image);
  }
  useEffect(() => {
    return () => {
      imagePreview && URL.revokeObjectURL(imagePreview.preview);
    };
  }, [imagePreview]);
  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleSetPreview(file);

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
    console.log(response.data.data.url);
    onChange(response.data.data.url);
  };
  return (
    <>
      <Input
        onChange={handleChange}
        url={imagePreview.preview || defaultValue}
        defaultValue={defaultValue || null}
        isFile
      ></Input>
    </>
  );
};

export default ImageUpload;