import React from "react";
import useLinkTransition from "hooks/useLinkTransition";

interface TransitionOptions {
  order?: number;
  delay?: number;
}

interface Props {
  link: string;
  show: boolean;
}

const SocialLink = ({ link, show }: Props): JSX.Element => {
  const [name, mask] = useLinkTransition(show);

  return (
    <React.Fragment>
      <a
        href="https://www.instagram.com/alfacharlie.co"
        target="_blank"
        rel="noopener noreferrer"
      />
      <span className="link-wrapper">
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

export default SocialLink;
