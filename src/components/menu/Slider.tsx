import React from "react";
import "./Slider.scss";

const Slider = (): JSX.Element => {
  const urlSite = "https://alfacharlie.b-cdn.net/wp-content/uploads/";
  const imageUrls = [
    "2019/05/Alfa-Charlie-Creative-Agency-home-e1558112927714.jpg",
    "2019/05/Alfa-Charlie-Creative-Agency-about-5.jpg",
    "2019/04/Alfa-Charlie-Creative-Agency-work.jpg",
    "2019/05/Alfa-Charlie-Creative-Agency-home-2.jpg",
    "2019/05/Alfa-Charlie-Creative-Agency-contact-2.jpg"
  ];

  return (
    <div className="menu-images -flex">
      <div className="menu-slider">
        <div className="slider-wrapper">
          {imageUrls.map(
            (url, id): JSX.Element => (
              <div className="slide" key={id}>
                <div
                  className="slide-img"
                  style={{ backgroundImage: `url(${urlSite}${url})` }}
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
