import React from "react";
import Hero from "./home/Hero";
import "./Home.scss";

const Home = (): JSX.Element => {
  return (
    <React.Fragment>
      <div className="row">
        <Hero />
      </div>
    </React.Fragment>
  );
};

export default Home;
