import React from "react";
import "./Outline.scss";

const Outline = (): JSX.Element => {
  return (
    <div className="cursor-outline">
      <svg viewBox="0 0 72 72" x="0" y="0">
        <circle cx="36" cy="36" r="30"></circle>
      </svg>
    </div>
  );
};

export default Outline;
