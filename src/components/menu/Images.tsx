import React, { useRef } from "react";
import useTransition from "hooks/useTransition";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import Slider from "components/Slider";

const imageUrls = [
  "2019/05/Alfa-Charlie-Creative-Agency-home-e1558112927714.jpg",
  "2019/05/Alfa-Charlie-Creative-Agency-about-5.jpg",
  "2019/04/Alfa-Charlie-Creative-Agency-work.jpg",
  "2019/05/Alfa-Charlie-Creative-Agency-home-2.jpg",
  "2019/05/Alfa-Charlie-Creative-Agency-contact-2.jpg"
];

interface Props {
  isOpen: boolean;
  hoveringElementID: number;
  previousElementID: number;
}

const Images = ({ isOpen, ...hoverProps }: Props): JSX.Element => {
  const images = useRef(null);

  const fadeIn = useTransition(images, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      delay: 800,
      duration: 400
    }
  });

  const fadeOut = useTransition(images, {
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: {
      delay: 650,
      duration: 0
    }
  });

  useDidUpdateEffect((): void => {
    if (isOpen) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [isOpen]);

  return (
    <div className="menu-images -flex" ref={images} style={{ opacity: 0 }}>
      <div className="menu-slider">
        <Slider imageUrls={imageUrls} isOpen={isOpen} {...hoverProps} />
      </div>
    </div>
  );
};

export default Images;
