import React from 'react';
import Hero from './homepage/Hero';
import QuickLinks from './homepage/user/QuickLinks';
import SpecialCollections from './homepage/user/SpecialCollections';
import Upcoming from './homepage/user/Upcoming';

function HomePageUser() {
  return (
    <>
      <Hero />
      <QuickLinks />
      <hr />
      <SpecialCollections />
      <Upcoming />
    </>
  );
}

export default HomePageUser;
