import React, { useState, useRef, RefObject } from "react";
import Mask from "components/slider/Mask";
import { classList } from "utils/class";
import useTransition from "hooks/useTransition";
import "./Member.scss";

interface Props {
  img: string;
  name: string;
  position: string;
  about: string;
  show: boolean;
  imgRef: RefObject<HTMLImageElement>;
}

const Member = ({
  img,
  name,
  position,
  about,
  show,
  imgRef
}: Props): JSX.Element => {
  const [isActive, setIsActive] = useState(false);
  const aboutRef = useRef(null);

  const desktopFadeIn = useTransition(aboutRef, {
    from: { opacity: 0, transform: "skewY(2deg) translateY(20px)" },
    to: { opacity: 1, transform: "skewY(0) translateY(0)" },
    config: {
      duration: 500,
      timing: [0.25, 0.1, 0.25, 1]
    }
  });

  const mobileFadeIn = useTransition(aboutRef, {
    from: { opacity: 0, height: "0px", marginTop: "0" },
    to: { opacity: 1, height: "110px", marginTop: "25px" },
    config: {
      duration: 250,
      timing: [0.25, 0.1, 0.25, 1]
    }
  });

  const desktopFadeOut = useTransition(aboutRef, {
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: {
      duration: 400,
      timing: [0.25, 0.1, 0.25, 1]
    }
  });

  const mobileFadeOut = useTransition(aboutRef, {
    from: { opacity: 1, height: "110px", marginTop: "25px" },
    to: { opacity: 0, height: "0", marginTop: "0" },
    config: {
      duration: 250,
      timing: [0.25, 0.1, 0.25, 1]
    }
  });

  const toggleAbout = (): void => {
    isActive
      ? window.innerWidth > 1024
        ? desktopFadeOut()
        : mobileFadeOut()
      : window.innerWidth > 1024
      ? desktopFadeIn()
      : mobileFadeIn();
    setIsActive(!isActive);
  };

  return (
    <div className={classList(["member", { active: isActive }])}>
      <div className="member-image-wrapper">
        <div className="member-image">
          <Mask isOpen={show} options={{ fadeDirection: "left", delay: 0 }} />
          <img src={img} ref={imgRef} />
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
