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
import { signUp } from "../../../store/auth/auth-slice";
import { TitleDocument } from "../../../config/config";
import { useDispatch } from "react-redux";
const UpdateEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [languages, setLanguages] = useState("");
  const sexs = [
    { label: "Male", key: "Male" },
    { label: "Female", key: "Female" },
  ];
  const ethnics = [{ label: "Kinh", key: "Kinh" }];

  const [language, setLanguage] = useState("VietNamese");
  const [sex, setSex] = useState("");
  const [image, setImage] = useState("");
  const [ethnic, setEthnic] = useState("Kinh");

  const handleAddEmployee = async (values) => {
    dispatch(
      signUp({
        ...values,
        sex,
        language,
        image,
        ethnic,
      })
    );

    toast.success("Add Employee Successfully", {
      pauseOnHover: false,
      autoClose: 1000,
    });
    setIsLoading(false);
    setTimeout(() => {
      setTimeout(() => {
        navigate("/staff/account/Employee");
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

    fetchLanguageList();
    document.title = `${TitleDocument} | Add Employee`;
  }, []);
  return (
    <div className="bg-lightGray  w-full">
      <Formik
        initialValues={{
          name: "", //
          email: "",
          password: "",
          cccd: "",
          birth: "",
          location: "",
          role: 1,
        }}
        onSubmit={(values) => {
          handleAddEmployee(values);
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
                      name="name"
                      placeholder="Name"
                      error={errors.name && touched.name ? errors.name : ""}
                      onChange={(e) => setFieldValue("name", e.target.value)}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>CCCD</Label>
                    <Input
                      name="cccd"
                      placeholder="Cccd"
                      error={errors.cccd && touched.cccd ? errors.cccd : ""}
                      onChange={(e) => setFieldValue("cccd", e.target.value)}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Location</Label>
                    <Input
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
                    <ImageUpload name="image" onChange={setImage}></ImageUpload>
                  </FormGroup>
                </div>
              </div>
              <div className="flex gap-5">
                <FormGroup className={"flex-1"}>
                  <Label>Email</Label>
                  <Input
                    name="email"
                    placeholder="Email"
                    error={errors.email && touched.email ? errors.email : ""}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                  ></Input>
                </FormGroup>
                <FormGroup className={"flex-1"}>
                  <Label>Password</Label>
                  <Input
                    name="password"
                    placeholder="Password"
                    error={
                      errors.password && touched.password ? errors.password : ""
                    }
                    onChange={(e) => setFieldValue("password", e.target.value)}
                  ></Input>
                </FormGroup>
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
                  Add
                </Button>
                <Button
                  onClick={() => navigate("/staff/account/Employee")}
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

export default UpdateEmployee;
