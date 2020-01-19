import React, { MouseEventHandler } from "react";
import LoaderLink from "components/LoaderLink";
import Character from "./link/Character";
import "./Link.scss";

interface Props {
  link: string;
  isOpen: boolean;
  swipeSlide: MouseEventHandler;
}

const Link = ({ link, isOpen, swipeSlide }: Props): JSX.Element => (
  <LoaderLink
    className="menu-nav-link"
    to={`/${link}`}
    onMouseEnter={swipeSlide}
  >
    <span className="link-characters">
      {link.split("").map(
        (character: string, id: number): JSX.Element => (
          <Character char={character} isOpen={isOpen} key={id} />
        )
      )}
    </span>
  </LoaderLink>
);

export default Link;
