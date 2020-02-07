import React, { useRef } from "react";
import useTransition from "hooks/useTransition";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import { fadeOut, fadeIn } from "utils/transitions";
import { ease } from "utils/timings";

interface CharProps {
  char: string;
  toggled: boolean;
}

const FooterChar = ({ char, toggled }: CharProps): JSX.Element => {
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

const HeadingChar = ({ char, toggled }: CharProps): JSX.Element => {
  const c = useRef(null);

  const delay = Math.floor(Math.random() * 6) * 75;

  const fadeInChar = useTransition(c, {
    ...fadeIn,
    config: {
      delay,
      duration: 700,
      timing: ease
    }
  });

  useDidUpdateEffect(() => {
    if (toggled) fadeInChar();
  }, [toggled]);

  return (
    <span ref={c} style={{ opacity: 0 }}>
      {char}
    </span>
  );
};

interface CharsProps {
  text: string;
  toggled: boolean;
  footer?: boolean;
}

const Chars = ({ text, toggled, footer = false }: CharsProps): JSX.Element => (
  <>
    {text
      .split("")
      .map((char, key) =>
        footer ? (
          <FooterChar char={char} toggled={toggled} key={key} />
        ) : (
          <HeadingChar char={char} toggled={toggled} key={key} />
        )
      )}
  </>
);

export default Chars;
