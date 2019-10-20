import React, { useRef, useEffect } from "react";
import useTransition from "hooks/useTransition";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import "./Link.scss";

interface Props {
  link: string;
  active: boolean;
  order: number;
  reveal: boolean;
}

const Link = ({ link, active, order, reveal }: Props): JSX.Element => {
  const mask = useRef(null);
  const name = useRef(null);

  const unmask = useTransition(mask, {
    from: { transform: "translateX(-101%)" },
    to: { transform: "translateX(101%)" },
    config: {
      delay: 1400 + order * 250,
      duration: 1400,
      timing: [0.85, 0, 0.15, 1]
    }
  });

  const fadeIn = useTransition(name, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      delay: 2100 + order * 200,
      duration: 700,
      timing: [0.55, 0, 0.45, 1]
    }
  });

  const fadeOut = useTransition(name, {
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: {
      delay: order * 300,
      duration: 400,
      timing: [0.35, 0.6, 0.45, 1]
    }
  });

  useEffect((): void => {
    if (reveal) {
      unmask();
      fadeIn();
    } else {
      fadeOut();
    }
  }, [reveal]);

  return (
    <li>
      <span className={`link-wrapper${active ? " active" : ""}`}>
        <span className="link-name" ref={name} style={{ opacity: 0 }}>
          {link}
        </span>
        <span
          className="link-mask"
          style={{ transform: "translateX(-101%)" }}
          ref={mask}
        />
      </span>
    </li>
  );
};

export default Link;
