import React from "react";
import "./SectionHeader.scss";

interface Props {
  text: string;
}

const SectionHeader = ({ text }: Props): JSX.Element => (
  <div className="section-header-wrapper">
    <h2 className="section-header">
      {text.split("").map((char, id) => (
        <span className="section-char" key={id}>
          {char}
        </span>
      ))}
    </h2>
  </div>
);

export default SectionHeader;
