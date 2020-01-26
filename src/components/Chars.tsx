import React, { useRef } from "react";
import useTransition from "hooks/useTransition";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import { fadeOut, fadeIn } from "utils/transitions";
import { ease } from "utils/timings";

interface CharProps {
  char: string;
  toggled: boolean;
}

const Char = ({ char, toggled }: CharProps): JSX.Element => {
  const c = useRef(null);

  const delay = (char.charCodeAt(0) % 8) * 50 + 250;

  const fadeOutChar = useTransition(c, {
    ...fadeOut,
    config: {
      delay,
      duration: 800,
      timing: ease
    }
  });

  const reset = useTransition(c, {
    ...fadeIn,
    config: { duration: 0 }
  });

  useDidUpdateEffect(() => {
    if (toggled) fadeOutChar();
    else reset();
  }, [toggled]);

  return (
    <span ref={c} style={{ opacity: 1 }}>
      {char}
    </span>
  );
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
