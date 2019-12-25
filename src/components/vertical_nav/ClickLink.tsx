import React, { useState } from "react";
import useLinkTransition from "hooks/useLinkTransition";

interface TransitionOptions {
  order: number;
  delay?: number;
}

interface Props {
  link: string;
  show: boolean;
  click: (toggle: () => void) => () => void;
  options: TransitionOptions;
}

const Link = ({
  link,
  click,
  show,
  options: { order, delay = 0 }
}: Props): JSX.Element => {
  const [isActive, setIsActive] = useState(false);
  const [name, mask] = useLinkTransition(show, { order, delay });

  const toggle = (): void => setIsActive(prev => !prev);

  return (
    <React.Fragment>
      <span
        className={`link-wrapper${isActive ? " active" : ""}`}
        onClick={click(toggle)}
      >
        <span className="link-name" ref={name} style={{ opacity: 0 }}>
          {link}
        </span>
        <span
          className="link-mask"
          style={{ transform: "translateX(-101%)" }}
          ref={mask}
        />
      </span>
    </React.Fragment>
  );
};

export default Link;
