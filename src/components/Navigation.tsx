import React from "react";
import "./Navigation.scss";

interface NavProps {
  links: [string, boolean][];
}

const Navigation = ({ links }: NavProps): JSX.Element => (
  <nav className="nav">
    <ul>
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

export default Navigation;
