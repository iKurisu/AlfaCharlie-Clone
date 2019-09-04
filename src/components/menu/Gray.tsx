import React, { useRef, useEffect } from "react";
import useTransition from "hooks/useTransition";
import "./Gray.scss";

interface Props {
  isOpen: boolean;
}

const Gray = ({ isOpen }: Props): JSX.Element => {
  const element = useRef<HTMLDivElement>(null);
  const didMount = useRef(false);

  const fadeIn = useTransition(element, {
    from: { transform: `translateX(-100%)` },
    to: { transform: `translateX(0)` },
    config: {
      duration: 850,
      timing: [0.28, 1, 0.5, 1],
      delay: 400
    }
  });

  const fadeOut = useTransition(element, {
    from: { transform: "translateX(0) scaleX(1)" },
    to: { transform: `translateX(50%) scaleX(2)` },
    config: {
      duration: 650,
      timing: [0.28, 1, 0.5, 1],
      delay: 200
    }
  });

  const hide = useTransition(element, {
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: { duration: 1000, timing: [0.28, 1, 0.5, 1] }
  });

  const reset = useTransition(element, {
    from: { opacity: 0, transform: "translateX(50%) scale(2)" },
    to: { opacity: 1, transform: "translateX(-100%) scale(1)" },
    config: { duration: 0 }
  });

  useEffect((): void => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    if (isOpen) {
      fadeIn();
    } else {
      fadeOut()
        .then(hide)
        .then(reset);
    }
  }, [isOpen]);

  return (
    <div
      className="menu-gray"
      style={{ transform: `translateX(-100%)` }}
      ref={element}
    />
  );
};

export default Gray;
