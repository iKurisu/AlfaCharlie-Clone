import React from "react";
import Character from "./link/Character";
import "./Link.scss";

interface Props {
  link: string;
  fadeInOrder: number[];
  updateHoveringElementId(): void;
}

const Link = ({
  link,
  fadeInOrder,
  updateHoveringElementId
}: Props): JSX.Element => {
  return (
    <a className="menu-nav-link" onMouseEnter={updateHoveringElementId}>
      <span className="link-characters">
        {link.split("").map(
          (character: string, id: number): JSX.Element => (
            <Character char={character} order={fadeInOrder[id]} key={id} />
          )
        )}
      </span>
    </a>
  );
};

export default Link;
