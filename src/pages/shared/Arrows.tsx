import React, { MouseEventHandler } from "react";
import { classList } from "utils/class";
import { getDuration } from "utils/slider";

export interface Props {
  currentSlideID: number;
  maxSwipes: number;
  swipeSlide: (slideID: number, delay: number) => MouseEventHandler;
}

const Arrows = ({
  currentSlideID,
  maxSwipes,
  swipeSlide
}: Props): JSX.Element => (
  <div className="hero-arrows">
    <div
      className={classList({
        ["arrow-prev"]: true,
        disabled: currentSlideID === 0
      })}
      onClick={swipeSlide(
        currentSlideID - 1,
        getDuration({ from: currentSlideID, to: currentSlideID - 1 })
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 157.34 51.71"
        xmlSpace="preserve"
      >
        <polyline points="128.65,45.62 148.36,25.91 128.47,6.02 " />
        <line x1="8.46" y1="25.91" x2="147.73" y2="25.91" />
      </svg>
    </div>
    <div
      className={classList({
        ["arrow-next"]: true,
        disabled: currentSlideID === maxSwipes
      })}
      onClick={swipeSlide(
        currentSlideID + 1,
        getDuration({ from: currentSlideID, to: currentSlideID + 1 })
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 157.34 51.71"
        xmlSpace="preserve"
      >
        <polyline points="128.65,45.62 148.36,25.91 128.47,6.02 " />
        <line x1="8.46" y1="25.91" x2="147.73" y2="25.91" />
      </svg>
    </div>
  </div>
);

export default Arrows;
