import React from "react";
import "./FooterArt.scss";

const FooterArt = (): JSX.Element => {
  return (
    <div className="footer-art">
      <div className="footer-a">
        <span className="footer-a-left" />
        <span className="footer-a-right" />
      </div>
      <div className="footer-b">
        <span className="footer-b-left" />
        <span className="footer-b-center" />
        <span className="footer-b-right" />
      </div>
    </div>
  );
};

export default FooterArt;
