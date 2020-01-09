import React from "react";
import Symbol from "./Symbol";
import Title from "./intro/Title";
import "./Intro.scss";

const Intro = (): JSX.Element => {
  return (
    <div className="intro">
      <div className="intro-main">
        <div className="main-background" />
        <div className="main-symbol">
          <div className="symbol-wrapper">
            <Symbol />
          </div>
        </div>
      </div>
      <div className="intro-inverted">
        <div className="inverted-background" />
        <div className="inverted-symbol">
          <div className="symbol-mask">
            <div className="symbol-wrapper">
              <Symbol />
            </div>
          </div>
        </div>
      </div>
      <div className="intro-title">
        <Title />
      </div>
    </div>
  );
};

export default Intro;
