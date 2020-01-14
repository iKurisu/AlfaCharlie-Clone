import React from "react";
import Link from "pages/shared/Link";
import "./Brief.scss";

const Brief = (): JSX.Element => (
  <section className="brief">
    <div className="brief-content">
      <div className="brief-animation">
        <h3 className="brief-title">
          Alfa Charlie is a boutique creative agency based in San Diego, CA.
        </h3>
      </div>
      <div className="brief-animation">
        <p className="brief-text">
          The nautical flags, Alfa Charlie, are code to abandon ship. For us,
          they’re a signal to defy convention, start fresh, and seek new
          territory, together.
        </p>
      </div>
      <div className="brief-animation">
        <Link content="Get in touch" to="/contact" />
      </div>
    </div>
    <div className="brief-image-wrapper">
      <div className="brief-image">
        <img src="https://alfacharlie.b-cdn.net/wp-content/uploads/2019/05/Alfa-Charlie-Creative-Agency-6.jpg" />
      </div>
    </div>
  </section>
);

export default Brief;
