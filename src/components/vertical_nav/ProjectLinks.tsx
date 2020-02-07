import React from "react";
import RoutedLink from "./RoutedLink";

interface Props {
  show: boolean;
}

const ProjectLinks = ({ show }: Props): JSX.Element => (
  <React.Fragment>
    <li key={0}>
      <RoutedLink to="/work" link="View all projects" show={show} />
    </li>
  </React.Fragment>
);

export default ProjectLinks;
