import React, { useState, MouseEventHandler } from "react";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import { classList } from "utils/class";
import { getDuration } from "utils/slider";
import "./SliderNav.scss";

export interface Props {
  imageUrls: string[];
  currentSlideID: number;
  swipeSlide: (slideID: number, delay: number) => MouseEventHandler;
}

const SliderNav = ({
  imageUrls,
  currentSlideID,
  swipeSlide
}: Props): JSX.Element => {
  const [dot, setDot] = useState(currentSlideID);

  const updateDot = (dot: number): MouseEventHandler => () => setDot(dot);
  const resetDot = (): void => setDot(currentSlideID);

  useDidUpdateEffect((): void => {
    resetDot();
  }, [currentSlideID]);

  return (
    <div className="slider-nav">
      <span className="slider-progress">
        <span className="slider-prefix">
          N<span>o</span>
        </span>
        <span className="slider-current">
          {imageUrls.map((_, id) => (
            <span
              style={{
                top: `${100 * id}%`,
                transform: `translateY(${-100 * dot}%)`,
                opacity: Number(dot === id)
              }}
              key={id}
            >
              {id + 1}
            </span>
          ))}
        </span>
      </span>
      <div className="slider-dots">
        {imageUrls.map((_, id) => (
          <span
            className={classList([
              "slider-dot",
              { active: id === currentSlideID }
            ])}
            onClick={swipeSlide(
              id,
              getDuration({ from: currentSlideID, to: id })
            )}
            onMouseOver={updateDot(id)}
            onMouseLeave={resetDot}
            key={id}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default SliderNav;
