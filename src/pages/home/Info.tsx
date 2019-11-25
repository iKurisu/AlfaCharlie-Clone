import React from "react";
import SectionHeader from "./shared/SectionHeader";
import List from "./info/List";
import Link from "./shared/Link";
import "./Info.scss";

const Info = (): JSX.Element => {
  return (
    <section className="info">
      <SectionHeader text="elegant solutions" />
      <div className="info-image-wrapper">
        <div className="info-image">
          <div className="image-wrapper">
            <img
              src={
                "https://alfacharlie.b-cdn.net/wp-content/uploads/" +
                "2019/05/Alfa-Charlie-Creative-Agency-6-1-e1558111141759.jpg"
              }
            />
          </div>
        </div>
      </div>
      <div className="info-content-wrapper">
        <div className="info-content">
          <div>
            <h3 className="info-title">Insight + creativity</h3>
          </div>
          <div>
            <p className="info-text">
              We’re adept at understanding what a project needs. Our designs
              capture the essence of your business, so you can make a more
              consistent and memorable impact, everywhere.
            </p>
          </div>
          <div>
            <List />
          </div>
          <div>
            <Link content="Learn more" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
