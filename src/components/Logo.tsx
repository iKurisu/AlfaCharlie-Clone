import React from "react";
import Icon from "./logo/Icon";
import LoaderLink from "./LoaderLink";
import "./Logo.scss";

const Logo = (): JSX.Element => (
  <div className="logo-wrapper">
    <LoaderLink to="/">
      <Icon />
    </LoaderLink>
  </div>
);

export default Logo;
