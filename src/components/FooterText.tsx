import React from "react";
import { Link } from "react-router-dom";
import "./FooterText.scss";

const FooterText = (): JSX.Element => (
  <div className="footer-text">
    <span className="footer-left">SAN DIEGO, CA</span>
    <span className="footer-center">
      <span>© COPYRIGHT ALFA CHARLIE LLC</span>
      <Link to="/privacy-policy">PRIVACY POLICY</Link>
    </span>
    <span className="footer-right">
      <a href="mailto:hello@alfacharlie.co">HELLO@ALFACHARLIE.CO</a>
    </span>
  </div>
);

export default FooterText;
