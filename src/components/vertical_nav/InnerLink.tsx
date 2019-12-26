import React from "react";
import useLinkTransition from "hooks/useLinkTransition";
import "./Link.scss";

export interface TransitionOptions {
  order?: number;
  delay?: number;
}

interface Props {
  show: boolean;
  text: string;
  options?: TransitionOptions;
}

const InnerLink = ({
  show,
  options = { delay: 0, order: 0 },
  text
}: Props): JSX.Element => {
  const [name, mask] = useLinkTransition(show, options);
  console.log(options);
  return (
    <React.Fragment>
      <span className="link-name" ref={name} style={{ opacity: 0 }}>
        {text}
      </span>
      <span
        className="link-mask"
        style={{ transform: "translateX(-101%)" }}
        ref={mask}
      />
    </React.Fragment>
  );
};

export default InnerLink;
