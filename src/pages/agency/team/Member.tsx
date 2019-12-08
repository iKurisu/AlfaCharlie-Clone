import React, { useState, useRef } from "react";
import { classList } from "utils/class";
import useTransition from "hooks/useTransition";
import "./Member.scss";

interface Props {
  img: string;
  name: string;
  position: string;
  about: string;
}

const Member = ({ img, name, position, about }: Props): JSX.Element => {
  const [isActive, setIsActive] = useState(false);
  const aboutRef = useRef(null);

  const fadeIn = useTransition(aboutRef, {
    from: { opacity: 0, transform: "skewY(2deg) translateY(20px)" },
    to: { opacity: 1, transform: "skewY(0) translateY(0)" },
    config: {
      duration: 500,
      timing: [0.25, 0.1, 0.25, 1]
    }
  });

  const fadeOut = useTransition(aboutRef, {
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: {
      duration: 400,
      timing: [0.25, 0.1, 0.25, 1]
    }
  });

  const toggleAbout = (): void => {
    isActive ? fadeOut() : fadeIn();
    setIsActive(!isActive);
  };

  return (
    <div className={classList(["member", { active: isActive }])}>
      <div className="member-image-wrapper">
        <div className="member-image">
          <img src={img} />
        </div>
      </div>
      <div className="member-info">
        <h4 className="member-name" onClick={toggleAbout}>
          {name}
        </h4>
        <h6 className="member-position">{position}</h6>
        <span className="member-icon">
          <span className="member-open">+</span>
          <span className="member-close">-</span>
        </span>
        <p className="member-about" style={{ opacity: 0 }} ref={aboutRef}>
          {about}
        </p>
      </div>
    </div>
  );
};

export default Member;
