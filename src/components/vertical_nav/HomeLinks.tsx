import React from "react";
import SocialLink from "./SocialLink";

interface Props {
  show: boolean;
}

const HomeLinks = ({ show }: Props): JSX.Element => (
  <li key={0}>
    <SocialLink show={show} />
  </li>
);

export default HomeLinks;
