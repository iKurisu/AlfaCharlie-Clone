import React from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import Outline from "./Outline";
import Progress from "./Progress";
import { Cursor, HoverableElement } from "modules/cursor/types";
import { classList } from "utils/class";

interface MappedState {
  menuToggled: boolean;
  currentCursor: Cursor;
  slide: number;
}

type Props = MappedState;

export const Menu = ({
  menuToggled,
  slide,
  currentCursor
}: Props): JSX.Element => (
  <div
    className={classList([
      "menu-cursor",
      { "-show": menuToggled || currentCursor === Cursor.SLIDER }
    ])}
  >
    <Outline />
    <Progress progress={slide / 4} />
  </div>
);

interface Slides {
  [k: string]: number;
}

export const mapSlide = (
  hovering: HoverableElement,
  { heroSlide, menuSlide, testimonialSlide }: Slides
): number => {
  switch (hovering) {
    case HoverableElement.HERO:
      return heroSlide;
    case HoverableElement.MENU:
      return menuSlide;
    case HoverableElement.TESTIMONIALS:
      return testimonialSlide;
    default:
      return 0;
  }
};

const mapState = ({
  cursor,
  menu: { toggled: menuToggled, hoveringElementID: menuSlide },
  hero: { currentSlideID: heroSlide },
  testimonials: { currentSlideID: testimonialSlide }
}: AppState): MappedState => ({
  ...cursor,
  menuToggled,
  slide: mapSlide(cursor.hovering, { heroSlide, menuSlide, testimonialSlide })
});

export default connect(mapState)(Menu);
