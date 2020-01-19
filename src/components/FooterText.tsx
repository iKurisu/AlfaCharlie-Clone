import React from "react";
import LoaderLink from "components/LoaderLink";
import "./FooterText.scss";

const FooterText = (): JSX.Element => (
  <div className="footer-text">
    <span className="footer-left">SAN DIEGO, CA</span>
    <span className="footer-center">
      <span>© COPYRIGHT ALFA CHARLIE LLC</span>
      <LoaderLink to="/privacy-policy">PRIVACY POLICY</LoaderLink>
    </span>
    <span className="footer-right">
      <a href="mailto:hello@alfacharlie.co">HELLO@ALFACHARLIE.CO</a>
    </span>
  </div>
);

export default FooterText;
