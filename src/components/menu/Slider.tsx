import React, { useRef } from "react";
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
  hoveringElementId: number;
  previousElementId: number;
}

const Slider = ({
  hoveringElementId,
  previousElementId
}: Props): JSX.Element => {
  const transitionLength =
    Math.abs(previousElementId - hoveringElementId) === 1 ? "1s" : "2s";

  const mask = useRef(null);

  return (
    <div className="menu-images -flex">
      <div className="menu-slider">
        <div className="slider-mask" ref={mask} />
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(${hoveringElementId * -399}px)`,
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
                      339 * (id - hoveringElementId)}px)`,
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
