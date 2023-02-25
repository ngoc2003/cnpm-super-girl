import axios from 'axios';
import { useState } from 'react';
import Input from '../components/Input';
import { imgbbAPI } from '../config/config';

interface ImageUploadProps {
  onChange?: (url: string) => void;
  defaultValue?: string;
  name?: string;
}

function ImageUpload({
  onChange = () => {},
  defaultValue,
  name = '',
}: ImageUploadProps) {
  const [imagePreview, setImagePreview] = useState(defaultValue || ''); // preview image update

  const [loading, setIsLoading] = useState(false);
  const handleChange = async (e) => {
    setIsLoading(true);
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
    if (response.data.data.url) {
      setIsLoading(false);
    }
    setImagePreview(response.data.data.url);
    onChange(response.data.data.url);
  };

  return (
    <Input
      name={name}
      onChange={handleChange}
      url={imagePreview}
      defaultValue={defaultValue || null}
      isFile
      isLoadingFile={loading}
    />
  );
}

export default ImageUpload;
