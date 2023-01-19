import axios from 'axios';
import React, { useState } from 'react';
import Input from '../components/Input';
import { imgbbAPI } from '../config/config.js';

function ImageUpload({ onChange = () => {}, defaultValue = '' }) {
  const [imagePreview, setImagePreview] = useState(defaultValue); // preview image update

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    const response = await axios({
      method: 'post',
      url: imgbbAPI,
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setImagePreview(response.data.data.url);
    onChange(response.data.data.url);
  };

  return (
    <Input
      onChange={handleChange}
      url={imagePreview}
      defaultValue={defaultValue || null}
      isFile
    />
  );
}

export default ImageUpload;
