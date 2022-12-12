import React, { lazy, Suspense, useEffect, useLayoutEffect } from "react";
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

function App() {
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
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
