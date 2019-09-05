import React from "react";
import "./Link.scss";

interface Props {
  link: string;
}

const Link = ({ link }: Props): JSX.Element => {
  return (
    <a className="menu-nav-link">
      <span className="link-characters">
        {link.split("").map(
          (character: string, id: number): JSX.Element => (
            <span className="link-character" key={id}>
              {character}
            </span>
          )
        )}
      </span>
    </a>
  );
};

export default Link;
