import React, { useState } from "react";
import "./Member.scss";
import { classList } from "utils/class";

interface Props {
  img: string;
  name: string;
  position: string;
  about: string;
}

const Member = ({ img, name, position, about }: Props): JSX.Element => {
  const [isActive, setIsActive] = useState(false);

  const toggleAbout = (): void => setIsActive(!isActive);

  return (
    <div
      className={classList({
        member: true,
        active: isActive
      })}
    >
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
        <p className="member-about">{about}</p>
      </div>
    </div>
  );
};

export default Member;
