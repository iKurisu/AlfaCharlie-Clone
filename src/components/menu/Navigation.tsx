import React from "react";
import Logo from "./navigation/Logo";
import Link from "./navigation/Link";
import "./Navigation.scss";

interface Props {
  isOpen: boolean;
  updateHoveringElementId(id: number): () => void;
}

const Navigation = ({
  isOpen,
  updateHoveringElementId
}: Props): JSX.Element => {
  const links = ["agency", "work", "journal", "contact"];
  const fadeInOrder = [
    [1, 4, 2, 2, 1, 3],
    [2, 3, 3, 3],
    [4, 1, 3, 4, 3, 4, 2],
    [2, 2, 4, 4, 4, 2, 2]
  ];

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
              fadeInOrder={fadeInOrder[id]}
              isOpen={isOpen}
              updateHoveringElementId={updateHoveringElementId(id + 1)}
              key={id}
            />
          )
        )}
      </nav>
    </div>
  );
};

export default Navigation;
