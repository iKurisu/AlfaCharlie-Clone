import React from "react";
import SocialLink from "./SocialLink";
import RoutedLink from "./RoutedLink";

interface Props {
  show: boolean;
  delay: number;
}

const MenuLinks = ({ show, delay }: Props): JSX.Element => (
  <React.Fragment>
    <li key={0}>
      <SocialLink show={show} options={{ order: 0, delay }} />
    </li>
    <li key={1}>
      <RoutedLink
        to="/privacy-policy"
        link="Privacy"
        show={show}
        options={{ order: 1, delay }}
      />
    </li>
  </React.Fragment>
);

export default MenuLinks;
