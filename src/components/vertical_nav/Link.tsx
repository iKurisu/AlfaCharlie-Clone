import React from "react";
import "./Link.scss";
import useLinkTransition from "hooks/useLinkTransition";

interface Link {
  link: string;
  href?: string;
  click?: <T>() => T;
  active?: boolean;
}

interface TransitionOptions {
  order?: number;
  delay?: number;
}

interface Props {
  link: Link;
  show: boolean;
  options?: TransitionOptions;
}

const Link = ({
  link: { link, href, click, active },
  show,
  options: { order = 0, delay = 0 }
}: Props): JSX.Element => {
  const [name, mask] = useLinkTransition(show, { order, delay });

  return (
    <React.Fragment>
      {href && <a href={href} />}
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
    </React.Fragment>
  );
};

export default Link;
