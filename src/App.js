import React, { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken, updateUser } from "./store/auth/auth-slice";
import { getToken, logOut } from "./utils/auth";
import { Routes, Route } from "react-router-dom";
const LayoutAdmin = lazy(() => import("./layouts/LayoutAdmin"));
const LayoutAuthen = lazy(() => import("./layouts/LayoutAuthen"));
const LayoutDefault = lazy(() => import("./layouts/LayoutDefault"));
const Staff = lazy(() => import("./pages/admin/Staff"));
const HomePageStaff = lazy(() => import("./pages/HomePageStaff"));
const HomePageUser = lazy(() => import("./pages/HomePageUser"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const BookDetail = lazy(() => import("./pages/BookDetail"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const ListRequest = lazy(() => import("./pages/ListRequest"));
// Admin
const Bookstore = lazy(() => import("./pages/admin/bookstore"));
const AddBook = lazy(() => import("./pages/admin/bookstore/AddBook"));
const ListBook = lazy(() => import("./pages/admin/bookstore/ListBook"));
const UpdateBook = lazy(() => import("./pages/admin/bookstore/UpdateBook"));
const LibraryPage = lazy(() => import("./pages/LibraryPage"));
const Reader = lazy(() => import("./pages/admin/reader"));
const Request = lazy(() => import("./pages/admin/request"));
const Statistic = lazy(() => import("./pages/admin/statistic"));
const Employee = lazy(() => import("./pages/admin/employee"));
const UpdateUser = lazy(() => import("./pages/admin/UpdateUser"));
const AddEmloyee = lazy(() => import("./pages/admin/employee/AddEmloyee"));

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
        {/* default */}
        <Route element={<LayoutDefault />}>
          <Route path="/" element={<HomePageUser />}></Route>
          <Route path="/Library" element={<LibraryPage />}></Route>
          <Route path="/Order" element={<OrderPage />}></Route>
          <Route path="/staff" element={<HomePageStaff />}></Route>
          <Route path="/Library/:slug" element={<BookDetail />}></Route>
          <Route path="/List" element={<ListRequest id={user._id} />}></Route>
          <Route path="*" element={<HomePageUser />}></Route>
        </Route>
        {/* admin */}
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
          {/* Statistic */}
          <Route
            path="/staff/account/Statistic"
            element={<Statistic />}
          ></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
