import React, { useRef, useEffect } from "react";
import useTransition from "hooks/useTransition";
import "./White.scss";

interface Props {
  isOpen: boolean;
}

const White = ({ isOpen }: Props): JSX.Element => {
  const element = useRef<HTMLDivElement>(null);
  const didMount = useRef(false);

  const fadeIn = useTransition(element, {
    from: { transform: `translateX(100%)`, opacity: 1 },
    to: { transform: `translateX(0)` },
    config: {
      duration: 400,
      timing: [0.25, 0.1, 0.25, 1]
    }
  });

  const reset = useTransition(element, {
    from: { transform: "translateX(0)" },
    to: { transform: `translateX(100%)` },
    config: { duration: 0, delay: 850 }
  });

  useEffect((): void => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    if (isOpen) {
      fadeIn();
    } else {
      reset();
    }
  }, [isOpen]);

  return (
    <div
      className="menu-white"
      style={{ transform: `translateX(100%)`, opacity: 1 }}
      ref={element}
    />
  );
};

export default White;
