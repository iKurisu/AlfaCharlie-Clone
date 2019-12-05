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
  return (
    <div className="member">
      <div className="member-image-wrapper">
        <div className="member-image">
          <img src={img} />
        </div>
      </div>
      <div className="member-info">
        <h4 className="member-name">{name}</h4>
        <h6 className="member-position">{position}</h6>
        <span className="member-icon">
          <span
            className={classList({
              "member-open": true,
            })}
          >
            +
          </span>
          <span
            className={classList({
              "member-close": true,
            })}
          >
            -
          </span>
        </span>
        <p className="member-about">{about}</p>
      </div>
    </div>
  );
};

export default Member;
