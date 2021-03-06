import React, { useRef } from "react";
import useTransition from "hooks/useTransition";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import "./Character.scss";

interface Props {
  char: string;
  isOpen: boolean;
}

const Character = ({ char, isOpen }: Props): JSX.Element => {
  const character = useRef(null);

  const fadeIn = useTransition(character, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      delay: 800 + Math.ceil(Math.random() * 4) * 100,
      duration: 1000,
      timing: [0.28, 1, 0.5, 1]
    }
  });

  const reset = useTransition(character, {
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: {
      delay: 1000,
      duration: 0
    }
  });

  useDidUpdateEffect((): void => {
    if (isOpen) {
      fadeIn();
    } else {
      reset();
    }
  }, [isOpen]);

  return (
    <span className="link-character" ref={character} style={{ opacity: 0 }}>
      {char}
    </span>
  );
};

export default Character;
