import React from "react";
import InnerLink, { TransitionOptions } from "./InnerLink";

interface Props {
  link: string;
  show: boolean;
  click: () => void;
  isActive: boolean;
  options: TransitionOptions;
}

const Link = ({ link, click, show, isActive, options }: Props): JSX.Element => {
  return (
    <span
      className={`link-wrapper${isActive ? " active" : ""}`}
      onClick={click}
    >
      <InnerLink show={show} options={options} text={link} />
    </span>
  );
};

export default Link;
