import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import IconIn from "../icons/IconIn";
import Images from "../images/Images";
import Header from "./parts/Header";
import Hero from "../pages/homepage/Hero";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "../store/auth/auth-slice";
import { logOut } from "../utils/auth";
const LayoutDefault = () => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogOut() {
    dispatch(refreshToken({}));
    logOut();
  }
  useEffect(() => {
    if (user && user.role === 1) {
      window.location.replace("/staff");
      // navigate("/staff");
    }
  }, []);
  return (
    <>
      <div className="flex md:h-screen">
        <div className="flex items-center px-2 bg-white">
          <span className="flex items-center justify-center w-10 h-10 duration-100 rounded-full cursor-pointer hover:bg-lightGray">
            <IconIn onClick={handleLogOut}></IconIn>
          </span>
        </div>
        <div className="flex-1">
          <Header></Header>
          
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default LayoutDefault;
