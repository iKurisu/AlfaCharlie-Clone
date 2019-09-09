import React from "react";
import Logo from "./navigation/Logo";
import Link from "./navigation/Link";
import "./Navigation.scss";

interface Props {
  updateHoveringElementId(id: number): () => void;
}

const Navigation = ({ updateHoveringElementId }: Props): JSX.Element => {
  const links = ["agency", "work", "journal", "contact"];

  return (
    <div className="menu-nav-wrapper -flex">
      <a className="menu-home-link">
        <Logo />
      </a>
      <nav
        className="menu-nav-links -flex"
        onMouseLeave={updateHoveringElementId(0)}
      >
        {links.map(
          (link: string, id: number): JSX.Element => (
            <Link
              link={link}
              key={id}
              updateHoveringElementId={updateHoveringElementId(id + 1)}
            />
          )
        )}
      </nav>
    </div>
  );
};

export default Navigation;
