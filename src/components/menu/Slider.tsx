import React, { useRef } from "react";
import useTransition from "hooks/useTransition";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import useMediaQuery from "hooks/useMediaQuery";
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
  const transitionLength =
    Math.abs(previousElementId - hoveringElementId) === 1 ? "1s" : "2s";

  const wrapperX = useMediaQuery([
    "(maxWidth: 1600px) => 27.2vw",
    "(minWidth: 1601px) => 27.2vw"
  ]);

  const imageX = useMediaQuery(["(maxWidth: 1600px) => 23.15vw"]);

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

  return (
    <div className="menu-images -flex" ref={wrapper} style={{ opacity: 0 }}>
      <div className="menu-slider">
        <div className="slider-mask" ref={mask} />
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(${hoveringElementId * -wrapperX}px)`,
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
                      imageX * (id - hoveringElementId)}px)`,
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
