import React from "react";
import InnerLink, { TransitionOptions } from "./InnerLink";

interface Props {
  show: boolean;
  options?: TransitionOptions;
}

const SocialLink = (props: Props): JSX.Element => (
  <React.Fragment>
    <a
      href="https://www.instagram.com/alfacharlie.co"
      target="_blank"
      rel="noopener noreferrer"
    />
    <span className="link-wrapper">
      <InnerLink {...props} text="Instagram" />
    </span>
  </React.Fragment>
);

export default SocialLink;
