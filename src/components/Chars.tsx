import React, { useRef, useEffect } from "react";
import useTransition from "hooks/useTransition";
import { fadeOut } from "utils/transitions";
import { ease } from "utils/timings";

interface CharProps {
  char: string;
  toggled: boolean;
}

const Char = ({ char, toggled }: CharProps): JSX.Element => {
  const c = useRef(null);

  const delay = (char.charCodeAt(0) % 12) * 50;

  const fadeOutChar = useTransition(c, {
    ...fadeOut,
    config: {
      delay,
      duration: 700,
      timing: ease
    }
  });

  useEffect(() => {
    if (toggled) fadeOutChar();
  }, [toggled]);

  return <span ref={c}>{char}</span>;
};

interface CharsProps {
  text: string;
  toggled: boolean;
}

const Chars = ({ text, toggled }: CharsProps): JSX.Element => (
  <>
    {text.split("").map((char, key) => (
      <Char char={char} toggled={toggled} key={key} />
    ))}
  </>
);

export default Chars;
