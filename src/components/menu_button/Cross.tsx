import React from "react";
import "./Cross.scss";

const Cross = (): JSX.Element => (
  <svg className="menu-cross" x="0px" y="0px" viewBox="0 0 59 59">
    <line x1="6.7" y1="6.5" x2="53" y2="53" />
    <line x1="6.7" y1="53" x2="53" y2="6.5" />
  </svg>
);

export default Cross;
