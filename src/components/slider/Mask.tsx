import React, { useRef } from "react";
import useTransition from "hooks/useTransition";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";

interface Props {
  isOpen: boolean;
}

const Mask = ({ isOpen }: Props): JSX.Element => {
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

  return <div className="slider-mask" ref={mask} />;
};

export default Mask;
