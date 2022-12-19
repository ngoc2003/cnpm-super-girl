import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import FormGroup from "../components/FormGroup";
import Input from "../components/Input";
import Label from "../components/Label";
import { useSelector } from "react-redux";
import { signIn } from "../store/auth/auth-slice";
import { toast } from "react-toastify";
const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  useEffect(() => {
    if (user) {
      if (user.role === 1) {
        navigate("/staff");
      } else navigate("/");
    }
  }, []);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [loading, setLoading] = useState(false);
  const handleSignIn = () => {
    // setLoading(true);
    if (!email || !password) {
      toast.error("Values not valid");
      setLoading(false);
    } else {
      dispatch(signIn({ email, password }));
    }
  };

  return (
    <div className=" mx-auto bg-white w-full max-w-[600px] p-8 rounded-md">
      <h4 className="text-2xl font-semibold pb-8 text-center">Sign In</h4>
      <FormGroup>
        <Label>Email *</Label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="abc@gmail.com"
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label>Password *</Label>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          icon={true}
        ></Input>
      </FormGroup>
      <div className="text-sm text-right">
        Dont have an account?{" "}
        <Link className="text-primary" to="/sign-up">
          Sign up here
        </Link>
      </div>
      <div className="p-2"></div>
      <Button isLoading={loading} onClick={handleSignIn} fluid primary>
        Sign In
      </Button>
    </div>
  );
};

export default SignInPage;
