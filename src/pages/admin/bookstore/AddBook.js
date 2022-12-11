import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import FormGroup from "../../../components/FormGroup";
import Label from "../../../components/Label";
import ImageUpload from "../../../utils/ImageUpload";
import Input from "../../../components/Input";
import MenuDropdown from "../../../components/MenuDropdown";
import Button from "../../../components/Button";
import { apiURL } from "../../../config/config";
import { toast } from "react-toastify";
import axios from "axios";
const AddBook = () => {
    const [languages, setLanguages] = useState("");
    const [groups, setGroups] = useState("");
    
    const [language, setLanguage] = useState("");
    const [group, setGroup] = useState("");
    const [image, setImage] = useState("");

  const handleAddNewBook = async (values) => {
    try {
      await axios.post(`${apiURL}/books/create`, {
        ...values,
      });
      toast.success("ADD SUCCESSFULLY");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function fetchLanguageList() {
      const response = await axios.get(`${apiURL}/languages/all`);
      setLanguages(response.data);
    }
    async function fetchGroupList() {
      const response = await axios.get(`${apiURL}/group/all`);
      setGroups(response.data);
    }
  }, []);
  return (
    <div className="bg-lightGray  w-full">
      <Formik
        initialValues={{
          image: image, //
          name: "", //
          amount: "", //
          pages: "", //
          language: "", //
          group: "", //
          author: "", //
          publisher: "", //
          publishYear: "", //
          edition: "",
          createdAt: "", //
          borrowAmount: 0, //
        }}
        onSubmit={(values) => handleAddNewBook(values)}
      >
        {({ errors, touched, setFieldValue }) => {
          return (
            <Form className="bg-white p-3 m-5 h-full">
              <div className="flex gap-5">
                <div className="flex-1">
                  <FormGroup>
                    <Label>Title</Label>
                    <Input
                      name="name"
                      placeholder="Title"
                      error={errors.title && touched.title ? errors.title : ""}
                      onChange={(e) => setFieldValue("title", e.target.value)}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Book's Amount</Label>
                    <Input
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
                    <ImageUpload name="image" onChange={setImage}></ImageUpload>
                  </FormGroup>
                </div>
              </div>
              <div className=" flex gap-5">
                <FormGroup className="flex-1">
                  <Label>Group</Label>
                  <MenuDropdown
                    setItem={setGroup}
                    item={group}
                    fluid
                  ></MenuDropdown>
                </FormGroup>
                <FormGroup className="flex-1">
                  <Label>Language</Label>
                  <MenuDropdown
                    setItem={setLanguage}
                    iten={language}
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
                    error={errors.author && touched.author ? errors.author : ""}
                    onChange={(e) => setFieldValue("author", e.target.value)}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label>Publisher</Label>
                  <Input
                    name="publisher"
                    placeholder="Publisher"
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
                    error={
                      errors.edition && touched.edition ? errors.edition : ""
                    }
                    onChange={(e) => setFieldValue("edition", e.target.value)}
                  ></Input>
                </FormGroup>
              </div>
              <div className="flex gap-5">
                <Button type="submit" primary fluid>
                  Apply
                </Button>
                <Button fluid>Cancel</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddBook;
