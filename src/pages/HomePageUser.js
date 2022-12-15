import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Search from "../components/Search";
import IconUser from "../icons/IconUser";
import { useSelector } from "react-redux";
import Hero from "./homepage/Hero";
import quickLinksData from "../data/quickLinksData";
import Images from "../images/Images";
import { v4 } from "uuid";
import QuickLinks from "./homepage/user/QuickLinks";
import SpecialCollections from "./homepage/user/SpecialCollections";
import Upcoming from "./homepage/user/Upcoming";
const HomePageUser = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user);

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
