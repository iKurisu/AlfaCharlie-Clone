import React, { useState, useRef, useEffect } from "react";
import useTransition from "hooks/useTransition";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import { vwToPx } from "utils/responsive";
import "./Slider.scss";

const urlSite = "https://alfacharlie.b-cdn.net/wp-content/uploads/";

interface Props {
  imageUrls: string[];
  isOpen: boolean;
  hoveringElementID: number;
  previousElementID: number;
}

const Slider = ({
  imageUrls,
  isOpen,
  hoveringElementID,
  previousElementID
}: Props): JSX.Element => {
  const [responsiveValues, setResponsiveValues] = useState({
    wrapper: vwToPx(27.2),
    image: vwToPx(23.15)
  });

  const updateResponsiveValues = (): void =>
    setResponsiveValues({
      wrapper: vwToPx(27.2),
      image: vwToPx(23.15)
    });

  useEffect((): (() => void) => {
    window.addEventListener("orientationchange", updateResponsiveValues);
    return (): void =>
      window.removeEventListener("orientationchange", updateResponsiveValues);
  }, [responsiveValues]);

  const mask = useRef(null);

  const revealSlider = useTransition(mask, {
    from: { transform: "translateX(0)" },
    to: { transform: "translateX(100%)" },
    config: {
      duration: 850,
      delay: 800,
      timing: [0.17, 0.5, 0.48, 1]
    }
  });

  const hideSlider = useTransition(mask, {
    from: { transform: "translateX(-100%)" },
    to: { transform: "translateX(0)" },
    config: {
      duration: 1000,
      timing: [0.17, 0.5, 0.48, 1]
    }
  });

  useDidUpdateEffect((): void => {
    if (isOpen) {
      revealSlider();
    } else {
      hideSlider();
    }
  }, [isOpen]);

  const transitionLength =
    Math.abs(previousElementID - hoveringElementID) === 1 ? "1s" : "2s";

  const wrapperDistance = (
    hoveringElementID * -responsiveValues.wrapper
  ).toFixed(3);

  const getImageDistance = (id: number): string => {
    const distance = 1 - responsiveValues.image * (id - hoveringElementID);
    return distance.toFixed(3);
  };

  return (
    <React.Fragment>
      <div className="slider-mask" ref={mask} />
      <div className="slider-swiper">
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(${wrapperDistance}px)`,
            transition: `transform ${transitionLength}`
          }}
        >
          {imageUrls.map(
            (url, id): JSX.Element => (
              <div className="slide" key={id}>
                <div
                  className="slide-img"
                  style={{
                    backgroundImage: `url(${urlSite}${url})`,
                    transform: `translateX(${getImageDistance(id)}px)`,
                    transition: `transform ${transitionLength}`
                  }}
                />
              </div>
            )
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Slider;
