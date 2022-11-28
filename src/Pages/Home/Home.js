import React from "react";
import Advertisement from "../Advertisement/Advertisement/Advertisement";
import Categories from "../Categories/Categories";
import Header from "../Header/Header";
import SiteOverview from "../SiteOverview/SiteOverview";

const Home = () => {
  return (
    <>
      <Header />
      <Advertisement />
      <Categories />
      <SiteOverview />
    </>
  );
};

export default Home;
