import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import IconIn from "../icons/IconIn";
import IconOut from "../icons/IconOut";
import Header from "./parts/Header";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "../store/auth/auth-slice";
import { logOut } from "../utils/auth";
const LayoutDefault = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogOut() {
    dispatch(refreshToken({}));
    logOut();
  }
  useEffect(() => {
    if (user && user.role === 1) {
      navigate("/staff");
    }
    if (window.location.href.includes("staff") && !user) {
      navigate("/");
    }
  }, [user]);
  return (
    <>
      <div className="flex md:h-screen">
        <div className="flex items-center px-2 bg-white ">
          <span className="flex items-center justify-center w-10 h-10 duration-100 rounded-full cursor-pointer border mr-2  hover:bg-lightGray">
            {!user ? (
              <IconIn onClick={() => navigate("/sign-in")} />
            ) : (
              <IconOut onClick={handleLogOut} />
            )}
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
