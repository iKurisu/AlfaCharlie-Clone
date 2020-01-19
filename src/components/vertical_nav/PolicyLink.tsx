import React from "react";
import LoaderLink from "components/LoaderLink";
import InnerLink, { TransitionOptions } from "./InnerLink";

interface Props {
  show: boolean;
  options: TransitionOptions;
}

const PolicyLink = (props: Props): JSX.Element => (
  <React.Fragment>
    <span className="link-wrapper">
      <LoaderLink to="/privacy-policy" />
      <InnerLink {...props} text="Privacy" />
    </span>
  </React.Fragment>
);

export default PolicyLink;
