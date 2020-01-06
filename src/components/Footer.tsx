import React from "react";
import { Link } from "react-router-dom";
import FooterText from "./FooterText";
import "./Footer.scss";

const Footer = (): JSX.Element => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-contact">
        <div className="footer-contact-inner">
          <Link to="/contact" />
          <h3>Let’s work together.</h3>
          <span>GET IN TOUCH</span>
        </div>
      </div>
      <FooterText />
    </div>
  </footer>
);

export default Footer;
