import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import FormGroup from "../../../components/FormGroup";
import Label from "../../../components/Label";
import ImageUpload from "../../../utils/ImageUpload";
import Input from "../../../components/Input";
import MenuDropdown from "../../../components/MenuDropdown";
import Button from "../../../components/Button";
import { apiURL } from "../../../config/config";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TitleDocument } from "../../../config/config";
import TextAreaInput from "../../../components/TextAreaInput";

const UpdateBook = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [languages, setLanguages] = useState("");
  const [types, setTypes] = useState("");

  const [language, setLanguage] = useState(data.language);
  const [type, setType] = useState(data.type);
  const [image, setImage] = useState(data.image);

  const handleUpdateBook = async (values) => {
    await axios.post(`${apiURL}/books/update`, {
      ...data,
      ...values,
      type,
      language,
      image,
    });
    toast.success("Update Book Successfully", {
      pauseOnHover: false,
      autoClose: 1000,
    });
    setIsLoading(false);
    setTimeout(() => {
      setTimeout(() => {
        navigate("/staff/account/Bookstore");
      }, 1000);
    });
  };
  useEffect(() => {
    async function fetchLanguageList() {
      const response = await axios.get(`${apiURL}/languages/all`);
      const data = response.data.map((item) => ({
        label: item.name,
        key: item.name,
      }));
      setLanguages(data);
    }
    async function fetchTypeList() {
      const responseGroup = await axios.get(`${apiURL}/groups/all`);
      const responseType = await axios.get(`${apiURL}/types/all`);
      const data = responseGroup.data.map((gr) => {
        let temp = {
          label: gr.name,
          key: gr.key,
        };
        let children = responseType.data
          .filter((tp) => tp.group === temp.key)
          .map((item) => ({ label: item.name, key: item.key }));
        let result = children.length
          ? { ...temp, children: [...children] }
          : temp;
        return result;
      });
      setTypes(data);
    }
    async function fetchOneDoc() {
      const response = await axios.get(`${apiURL}/books/${slug}`);
      setData(response.data);
    }
    fetchLanguageList();
    fetchTypeList();
    fetchOneDoc();
    document.title = `${TitleDocument} | Update`;
  }, []);
  return (
    <div className="bg-lightGray  w-full">
      <Formik
        initialValues={{
          image: image, //
          name: data.name, //
          amount: data.amount, //
          pages: data.pages, //
          language: data.language, //
          type: data.type, //
          author: data.author, //
          publisher: data.publisher, //
          publishYear: data.publishYear, //
          edition: data.edition,
          borrowAmount: data.borrowAmount, //
          description: data.description,
        }}
        onSubmit={(values) => {
          handleUpdateBook(values);
          setIsLoading(true);
        }}
      >
        {({ errors, touched, setFieldValue }) => {
          return (
            <Form className="bg-white p-3 m-5 h-full">
              <div className="flex gap-5">
                <div className="flex-1">
                  <FormGroup>
                    <Label>Title</Label>
                    <Input
                      defaultValue={data.name}
                      name="name"
                      placeholder="Title"
                      error={errors.name && touched.name ? errors.name : ""}
                      onChange={(e) => setFieldValue("name", e.target.value)}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Book's Amount</Label>
                    <Input
                      defaultValue={data.amount}
                      name="amount"
                      placeholder="Amount"
                      error={
                        errors.amount && touched.amount ? errors.amount : ""
                      }
                      onChange={(e) => setFieldValue("amount", e.target.value)}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Page Number</Label>
                    <Input
                      defaultValue={data.pages}
                      name="pages"
                      placeholder="Pages"
                      error={errors.pages && touched.pages ? errors.pages : ""}
                      onChange={(e) => setFieldValue("pages", e.target.value)}
                    ></Input>
                  </FormGroup>
                </div>
                <div className="flex-1">
                  <FormGroup>
                    <Label>Image</Label>
                    <ImageUpload
                      defaultValue={data.image}
                      name="image"
                      onChange={setImage}
                    ></ImageUpload>
                  </FormGroup>
                </div>
              </div>
              <div className=" flex gap-5">
                <FormGroup className="flex-1">
                  <Label>Group</Label>
                  <MenuDropdown
                    defaultValue={data.type}
                    setItem={setType}
                    item={type}
                    fluid
                    data={types}
                  ></MenuDropdown>
                </FormGroup>
                <FormGroup className="flex-1">
                  <Label>Language</Label>
                  <MenuDropdown
                    setItem={setLanguage}
                    defaultValue={data.language}
                    item={language}
                    data={languages}
                    fluid
                  ></MenuDropdown>
                </FormGroup>
              </div>
              <div>
                <FormGroup>
                  <Label>Author</Label>
                  <Input
                    name="author"
                    placeholder="Author"
                    defaultValue={data.author}
                    error={errors.author && touched.author ? errors.author : ""}
                    onChange={(e) => setFieldValue("author", e.target.value)}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label>Publisher</Label>
                  <Input
                    name="publisher"
                    placeholder="Publisher"
                    defaultValue={data.publisher}
                    error={
                      errors.publisher && touched.publisher
                        ? errors.publisher
                        : ""
                    }
                    onChange={(e) => setFieldValue("publisher", e.target.value)}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label>Publish Year</Label>
                  <Input
                    name="publishYear"
                    placeholder="Publish Year"
                    defaultValue={data.publishYear}
                    error={
                      errors.publishYear && touched.publishYear
                        ? errors.publishYear
                        : ""
                    }
                    onChange={(e) =>
                      setFieldValue("publishYear", e.target.value)
                    }
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label>Edition</Label>
                  <Input
                    name="Edition"
                    placeholder="Edition"
                    defaultValue={data.edition}
                    error={
                      errors.edition && touched.edition ? errors.edition : ""
                    }
                    onChange={(e) => setFieldValue("edition", e.target.value)}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label>Description</Label>
                  <TextAreaInput
                    defaultValue={data.description || ""}
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                    error={
                      errors.description && touched.description
                        ? errors.description
                        : ""
                    }
                    placeholder="Description"
                  />
                </FormGroup>
              </div>
              <div className="flex gap-5">
                <Button type="submit" isLoading={isLoading} primary fluid>
                  Update
                </Button>
                {/* to="/staff/account/Bookstore" */}
                <Button
                  onClick={() => navigate("/staff/account/Bookstore")}
                  fluid
                >
                  Cancel
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UpdateBook;
