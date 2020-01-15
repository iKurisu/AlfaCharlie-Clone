import React, { RefObject } from "react";
import "./Progress.scss";

interface Props {
  progress?: number;
  circleRef?: RefObject<SVGCircleElement>;
}

const Progress = ({ progress = 0, circleRef }: Props): JSX.Element => (
  <div className="cursor-progress">
    <svg viewBox="0 0 72 72" x="0" y="0">
      <circle
        cx="36"
        cy="36"
        r="30"
        style={{ strokeDashoffset: progress * -200 + 200 }}
        ref={circleRef}
      />
    </svg>
  </div>
);

export default Progress;
