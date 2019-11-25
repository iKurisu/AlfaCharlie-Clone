import React from "react";

interface Props {
  url: string;
  distance: number;
  duration: number;
  imageRef: React.RefObject<HTMLDivElement>;
}

const siteUrl = "https://alfacharlie.b-cdn.net/wp-content/uploads/";

const Slide = ({ url, distance, duration, imageRef }: Props): JSX.Element => (
  <div className="slide">
    <div
      className="slide-img"
      ref={imageRef}
      style={{
        backgroundImage: `url(${siteUrl}${url})`,
        transform: `translateX(${distance.toFixed(3)}px)`,
        transition: `transform ${duration}ms`
      }}
    />
  </div>
);

export default Slide;
