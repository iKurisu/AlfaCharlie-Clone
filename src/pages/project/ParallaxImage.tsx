import React, { useRef, ImgHTMLAttributes, DetailedHTMLProps } from "react";
import useParallax from "hooks/useParallax";

type Unit = "%" | "px" | "vh" | "vw" | "vmax" | "vmin";

type ImgAttributes = ImgHTMLAttributes<HTMLImageElement>;
type ImageProps = DetailedHTMLProps<ImgAttributes, HTMLImageElement>;

interface Props extends ImageProps {
  min: number;
  max: number;
  unit?: Unit;
}

const ParallaxImage = (props: Props): JSX.Element => {
  const { min, max, unit = "%", ...imgProps } = props;

  const parallaxImage = useRef(null);
  useParallax(parallaxImage, { min, max, unit });

  return (
    <img
      {...imgProps}
      ref={parallaxImage}
      style={{ transform: `translateY(${min + unit})` }}
    />
  );
};

export default ParallaxImage;
