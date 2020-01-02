import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = (): JSX.Element => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-contact">
        <Link to="/contact" />
        <h3>Let’s work together.</h3>
        <span>GET IN TOUCH</span>
      </div>
      <div className="footer-text"></div>
    </div>
  </footer>
);

export default Footer;
