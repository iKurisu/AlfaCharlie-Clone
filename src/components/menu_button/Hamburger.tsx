import React from "react";
import "./Hamburger.scss";

const Hamburger = (): JSX.Element => (
  <svg className="menu-hamburger" x="0" y="0" viewBox="0 0 72 72">
    <line x1="2" y1="9" x2="69" y2="9"></line>
    <line x1="2" y1="35" x2="69" y2="35"></line>
    <line x1="2" y1="61" x2="69" y2="61"></line>
  </svg>
);

export default Hamburger;
