import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import FormGroup from "../../components/FormGroup";
import Label from "../../components/Label";
import ImageUpload from "../../utils/ImageUpload";
import Input from "../../components/Input";
import MenuDropdown from "../../components/MenuDropdown";
import Button from "../../components/Button";
import { apiURL } from "../../config/config";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TitleDocument } from "../../config/config";
const UpdateUser = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [languages, setLanguages] = useState("");
  const sexs = [
    { label: "Male", key: "Male" },
    { label: "Female", key: "Female" },
  ];
  const ethnics = [{ label: "Kinh", key: "Kinh" }];

  const [language, setLanguage] = useState(data.language);
  const [sex, setSex] = useState(data.sex || "");
  const [image, setImage] = useState(data.image);
  const [ethnic, setEthnic] = useState(data.ethnic || "");

  const handleUpdateBook = async (values) => {
    await axios.post(`${apiURL}/users/update`, {
      ...data,
      ...values,
      sex,
      language,
      image,
      ethnic,
    });
    toast.success("Update Employee Successfully", {
      pauseOnHover: false,
      autoClose: 1000,
    });
    setIsLoading(false);
    setTimeout(() => {
      setTimeout(() => {
        navigate(`/staff/account/${data.role === 1 ? "Employee" : "Readers"}`);
      }, 1000);
    });
  };
  useEffect(() => {
    async function fetchOneDoc() {
      const response = await axios.get(`${apiURL}/users/${slug}`);
      setData(response.data);
    }
    async function fetchLanguageList() {
      const response = await axios.get(`${apiURL}/languages/all`);
      const data = response.data.map((item) => ({
        label: item.name,
        key: item.name,
      }));
      setLanguages(data);
    }

    fetchLanguageList();
    fetchOneDoc();
    document.title = `${TitleDocument} | Update Employee`;
  }, []);
  return (
    <div className="bg-lightGray  w-full">
      <Formik
        initialValues={{
          image: image || "", //
          name: data.name, //
          sex: data.sex || "",
          ethnic: data.ethnic || "",
          language: data.language || "",
          cccd: data.cccd || "",
          birth: data.birth || "",
          location: data.location || "",
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
                    <Label>Name</Label>
                    <Input
                      defaultValue={data.name}
                      name="name"
                      placeholder="Name"
                      error={errors.name && touched.name ? errors.name : ""}
                      onChange={(e) => setFieldValue("name", e.target.value)}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>CCCD</Label>
                    <Input
                      defaultValue={data.cccd}
                      name="cccd"
                      placeholder="Cccd"
                      error={errors.cccd && touched.cccd ? errors.cccd : ""}
                      onChange={(e) => setFieldValue("cccd", e.target.value)}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Location</Label>
                    <Input
                      defaultValue={data.location}
                      name="location"
                      placeholder="Location"
                      error={
                        errors.location && touched.location
                          ? errors.location
                          : ""
                      }
                      onChange={(e) =>
                        setFieldValue("location", e.target.value)
                      }
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
                  <Label>Sex</Label>
                  <MenuDropdown
                    defaultValue={sex}
                    setItem={setSex}
                    item={sex}
                    fluid
                    data={sexs}
                  ></MenuDropdown>
                </FormGroup>
                <FormGroup className="flex-1">
                  <Label>Language</Label>
                  <MenuDropdown
                    setItem={setLanguage}
                    defaultValue={language}
                    item={language}
                    data={languages}
                    fluid
                  ></MenuDropdown>
                </FormGroup>
                <FormGroup className="flex-1">
                  <Label>Ethnic</Label>
                  <MenuDropdown
                    setItem={setEthnic}
                    defaultValue={ethnic}
                    item={ethnic}
                    data={ethnics}
                    fluid
                  ></MenuDropdown>
                </FormGroup>
              </div>

              <div className="flex gap-5">
                <Button type="submit" isLoading={isLoading} primary fluid>
                  Update
                </Button>
                <Button
                  onClick={() =>
                    navigate(
                      `/staff/account/${
                        data.role === 1 ? "Employee" : "Readers"
                      }`
                    )
                  }
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

export default UpdateUser;
