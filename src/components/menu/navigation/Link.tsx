import React, { MouseEventHandler } from "react";
import Character from "./link/Character";
import "./Link.scss";

interface Props {
  link: string;
  fadeInOrder: number[];
  isOpen: boolean;
  hoverElement: MouseEventHandler;
}

const Link = ({
  link,
  fadeInOrder,
  isOpen,
  hoverElement
}: Props): JSX.Element => (
  <a className="menu-nav-link" onMouseEnter={hoverElement}>
    <span className="link-characters">
      {link.split("").map(
        (character: string, id: number): JSX.Element => (
          <Character
            char={character}
            order={fadeInOrder[id]}
            isOpen={isOpen}
            key={id}
          />
        )
      )}
    </span>
  </a>
);

export default Link;
