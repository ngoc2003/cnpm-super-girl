import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LayoutAuthen from "./layouts/LayoutAuthen";
import LayoutDefault from "./layouts/LayoutDefault";
import HomePageUser from "./pages/HomePageUser";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

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
          <Route path="*" element={<HomePageUser />}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
