import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import FormGroup from "../components/FormGroup";
import Input from "../components/Input";
import Label from "../components/Label";

const SignInPage = () => {
  return (
    <div className=" mx-auto bg-white w-full max-w-[600px] p-8 rounded-md">
      <h4 className="text-2xl font-semibold pb-8 text-center">Sign In</h4>
      <FormGroup>
        <Label>Email *</Label>
        <Input placeholder="abc@gmail.com"></Input>
      </FormGroup>
      <FormGroup>
        <Label>Password *</Label>
        <Input placeholder="Password" icon={true}></Input>
      </FormGroup>
      <div className="text-sm text-right">
        Dont have an account? <Link className="text-primary" to="/sign-up">Sign up here</Link>
      </div>
      <div className="p-2"></div>
      <Button fluid primary>
        Sign In
      </Button>
    </div>
  );
};

export default SignInPage;
