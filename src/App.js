import React, { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken, updateUser } from "./store/auth/auth-slice";
import { getToken, logOut } from "./utils/auth";
import { Routes, Route } from "react-router-dom";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutAuthen from "./layouts/LayoutAuthen";
import LayoutDefault from "./layouts/LayoutDefault";
import Staff from "./pages/admin/Staff";
import HomePageStaff from "./pages/HomePageStaff";
import HomePageUser from "./pages/HomePageUser";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Bookstore from "./pages/admin/bookstore";
import AddBook from "./pages/admin/bookstore/AddBook";
import ListBook from "./pages/admin/bookstore/ListBook";
import UpdateBook from "./pages/admin/bookstore/UpdateBook";

import Reader from "./pages/admin/reader";
import Request from "./pages/admin/request";
import Employee from "./pages/admin/employee";
import UpdateUser from "./pages/admin/UpdateUser";
import AddEmloyee from "./pages/admin/employee/AddEmloyee";

function App() {
  const user = useSelector((state) => state.auth);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user._id) {
      const { access_token } = getToken();
      dispatch(
        updateUser({
          user: user,
          accessToken: access_token,
        })
      );
    } else {
      const { refresh_token } = getToken();
      if (refreshToken) {
        dispatch(refreshToken(refresh_token));
      } else {
        dispatch(refreshToken({}));
        logOut();
      }
    }
  }, []);
  return (
    <Suspense>
      <Routes>
        <Route element={<LayoutAuthen />}>
          <Route path="/sign-in" element={<SignInPage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
        </Route>
        <Route element={<LayoutDefault />}>
          <Route path="/" element={<HomePageUser />}></Route>
          <Route path="/staff" element={<HomePageStaff />}></Route>
          <Route path="*" element={<HomePageUser />}></Route>
        </Route>
        <Route element={<LayoutAdmin />}>
          <Route path="/staff/account" element={<Staff />}></Route>
          <Route
            path="/staff/account/Bookstore"
            element={<Bookstore />}
          ></Route>
          <Route
            path="/staff/account/Bookstore/add"
            element={<AddBook />}
          ></Route>
          <Route
            path="/staff/account/Bookstore/all"
            element={<ListBook />}
          ></Route>
          <Route
            path="/staff/account/Bookstore/update/:slug"
            element={<UpdateBook />}
          ></Route>
          {/* Employee */}
          <Route path="/staff/account/Employee" element={<Employee />}></Route>
          <Route
            path="/staff/account/Employee/add"
            element={<AddEmloyee />}
          ></Route>
          <Route
            path="/staff/account/User/update/:slug"
            element={<UpdateUser />}
          ></Route>
          {/* Reader */}
          <Route path="/staff/account/Readers" element={<Reader />}></Route>
          <Route path="/staff/account/*" element={<Staff />}></Route>
          {/* Request */}
          <Route path="/staff/account/Request" element={<Request />}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
