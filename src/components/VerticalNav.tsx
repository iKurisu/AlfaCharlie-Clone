import React from "react";
import Link from "./vertical_nav/Link";
import "./VerticalNav.scss";

interface NavProps {
  links: [string, boolean][];
  show?: boolean;
}

const VerticalNav = ({ links, show }: NavProps): JSX.Element => (
  <nav className="vertical-nav">
    <ul className="vertical-nav-links">
      {links.map(
        ([link, active], id): JSX.Element => (
          <Link key={id} link={link} active={active} order={id} show={show} />
        )
      )}
    </ul>
  </nav>
);

export default VerticalNav;
