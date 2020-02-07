import React, { useEffect, useRef } from "react";
import useTransition from "hooks/useTransition";

interface MaskOptions {
  fadeDirection: "left" | "right";
  delay: number;
}

interface Props {
  isOpen: boolean;
  canHide?: boolean;
  options: MaskOptions;
}

const Mask = ({ isOpen, canHide = false, options }: Props): JSX.Element => {
  const mask = useRef(null);

  const revealSlider = useTransition(mask, {
    from: { transform: "translateX(0)" },
    to: {
      transform: `translateX(${
        options.fadeDirection === "right" ? 100 : -100
      }%)`
    },
    config: {
      duration: 850,
      delay: options.delay,
      timing: [0.17, 0.5, 0.48, 1]
    }
  });

  const hideSlider = useTransition(mask, {
    from: {
      transform: `translateX(${
        options.fadeDirection === "right" ? -100 : 100
      }%)`
    },
    to: { transform: "translateX(0)" },
    config: {
      duration: 1000,
      timing: [0.17, 0.5, 0.48, 1]
    }
  });

  useEffect((): void => {
    if (isOpen) revealSlider();
    else if (canHide) hideSlider();
  }, [isOpen]);

  return (
    <div
      className="slider-mask"
      ref={mask}
      style={{ transform: "translateX(0)" }}
    />
  );
};

export default Mask;
