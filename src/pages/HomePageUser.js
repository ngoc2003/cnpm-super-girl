import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Hero from "./homepage/Hero";
import QuickLinks from "./homepage/user/QuickLinks";
import SpecialCollections from "./homepage/user/SpecialCollections";
import Upcoming from "./homepage/user/Upcoming";
const HomePageUser = () => {
  // const navigate = useNavigate();
  // const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Hero />
      <QuickLinks />
      <hr />
      <SpecialCollections />
      <Upcoming />
    </>
  );
};

export default HomePageUser;
