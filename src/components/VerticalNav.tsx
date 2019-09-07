import React from "react";
import "./VerticalNav.scss";

interface NavProps {
  links: [string, boolean][];
  location?: string;
}

const VerticalNav = ({ links }: NavProps): JSX.Element => (
  <nav className="vertical-nav">
    <ul className="vertical-nav-links">
      {links.map(
        ([link, active], id): JSX.Element => (
          <li key={id}>
            <span className={`link-wrapper${active ? " active" : ""}`}>
              <span className="link-name">{link}</span>
            </span>
          </li>
        )
      )}
    </ul>
  </nav>
);

export default VerticalNav;
