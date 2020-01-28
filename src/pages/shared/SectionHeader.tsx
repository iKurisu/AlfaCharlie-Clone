import React from "react";
import "./SectionHeader.scss";
import Chars from "components/Chars";

interface Props {
  text: string;
  show: boolean;
}

const SectionHeader = ({ text, show }: Props): JSX.Element => (
  <div className="section-header-wrapper">
    <h2 className="section-header">
      <Chars text={text} toggled={show} />
    </h2>
  </div>
);

export default SectionHeader;
