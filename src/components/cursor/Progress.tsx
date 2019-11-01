import React from "react";
import "./Progress.scss";

interface Props {
  progress: number;
}

const Progress = ({ progress }: Props): JSX.Element => (
  <div className="cursor-progress">
    <svg viewBox="0 0 72 72" x="0" y="0">
      <circle
        cx="36"
        cy="36"
        r="30"
        style={{ strokeDashoffset: progress * -200 + 200 }}
      ></circle>
    </svg>
  </div>
);

export default Progress;
