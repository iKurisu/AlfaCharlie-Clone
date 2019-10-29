import React, { useState, useRef, useEffect } from "react";
import useTransition from "hooks/useTransition";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import { vwToPx } from "utils/responsive";
import "./Slider.scss";

const urlSite = "https://alfacharlie.b-cdn.net/wp-content/uploads/";
const imageUrls = [
  "2019/05/Alfa-Charlie-Creative-Agency-home-e1558112927714.jpg",
  "2019/05/Alfa-Charlie-Creative-Agency-about-5.jpg",
  "2019/04/Alfa-Charlie-Creative-Agency-work.jpg",
  "2019/05/Alfa-Charlie-Creative-Agency-home-2.jpg",
  "2019/05/Alfa-Charlie-Creative-Agency-contact-2.jpg"
];

interface Props {
  isOpen: boolean;
  hoveringElementId: number;
  previousElementId: number;
}

const Slider = ({
  isOpen,
  hoveringElementId,
  previousElementId
}: Props): JSX.Element => {
  const [wrapperTranslate, setWrapperTranslate] = useState(vwToPx(27.2));
  const [imageTranslate, setImageTranslate] = useState(vwToPx(23.15));

  const updateTranslateValues = (): void => {
    setWrapperTranslate(vwToPx(27.2));
    setImageTranslate(vwToPx(23.15));
  };

  useEffect((): (() => void) => {
    window.addEventListener("resize", updateTranslateValues);

    return (): void =>
      window.removeEventListener("resize", updateTranslateValues);
  }, [imageTranslate]);

  const wrapper = useRef(null);
  const mask = useRef(null);

  const fadeIn = useTransition(wrapper, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      delay: 800,
      duration: 400
    }
  });

  const fadeOut = useTransition(wrapper, {
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: {
      delay: 650,
      duration: 0
    }
  });

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
      fadeIn();
      revealSlider();
    } else {
      hideSlider();
      fadeOut();
    }
  }, [isOpen]);

  const transitionLength =
    Math.abs(previousElementId - hoveringElementId) === 1 ? "1s" : "2s";

  return (
    <div className="menu-images -flex" ref={wrapper} style={{ opacity: 0 }}>
      <div className="menu-slider">
        <div className="slider-mask" ref={mask} />
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(${hoveringElementId * -wrapperTranslate}px)`,
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
                    transform: `translateX(${1 -
                      wrapperTranslate * (id - hoveringElementId)}px)`,
                    transition: `transform ${transitionLength}`
                  }}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Slider;
