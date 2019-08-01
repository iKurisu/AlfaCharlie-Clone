import React from "react";
import Icon from "./logo/Icon";
import "./Logo.scss";

const Logo = (): JSX.Element => (
  <div className="logo-wrapper">
    <a href="/">
      <Icon />
    </a>
  </div>
);

export default Logo;
