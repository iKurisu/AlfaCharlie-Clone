import React from "react";
import LoaderLink from "components/LoaderLink";
import InnerLink, { TransitionOptions } from "./InnerLink";

interface Props {
  to: string;
  link: string;
  show: boolean;
  options?: TransitionOptions;
}

const RoutedLink = ({ to, link, ...props }: Props): JSX.Element => (
  <React.Fragment>
    <span className="link-wrapper">
      <LoaderLink to={to} />
      <InnerLink {...props} text={link} />
    </span>
  </React.Fragment>
);

export default RoutedLink;
