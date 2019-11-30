import React from "react";
import Hero from "./home/Hero";
import Info from "./home/Info";
import Testimonials from "./shared/Testimonials";
import "./Home.scss";

const Home = (): JSX.Element => {
  return (
    <React.Fragment>
      <div className="row">
        <Hero />
      </div>
      <div className="separator" />
      <div className="row">
        <Info />
      </div>
      <div className="separator" />
      <div className="row">
        <Testimonials />
      </div>
    </React.Fragment>
  );
};

export default Home;
