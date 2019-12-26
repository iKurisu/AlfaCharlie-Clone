import React from "react";
import { Link } from "react-router-dom";
import InnerLink, { TransitionOptions } from "./InnerLink";

interface Props {
  show: boolean;
  options: TransitionOptions;
}

const PolicyLink = (props: Props): JSX.Element => (
  <React.Fragment>
    <span className="link-wrapper">
      <Link to="/privacy-policy" />
      <InnerLink {...props} text="Privacy" />
    </span>
  </React.Fragment>
);

export default PolicyLink;
