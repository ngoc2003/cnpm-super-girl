import MotionDefault from '../layouts/motions/MotionDefault';
import Hero from './homepage/Hero';
import QuickLinks from './homepage/user/QuickLinks';
import SpecialCollections from './homepage/user/SpecialCollections';
import Upcoming from './homepage/user/Upcoming';

function HomePageUser() {
  return (
    <MotionDefault>
      <Hero />
      <QuickLinks />
      <hr />
      <SpecialCollections />
      <Upcoming />
    </MotionDefault>
  );
}

export default HomePageUser;
