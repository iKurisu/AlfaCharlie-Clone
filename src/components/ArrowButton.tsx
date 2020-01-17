import React, { useState, useContext, useEffect } from "react";
import Arrow from "./Arrow";
import { SubscriberContext } from "../App";
import { classList } from "utils/class";
import { isLandscape, isMobile } from "utils/responsive";
import "./ArrowButton.scss";

const ArrowButton = (): JSX.Element => {
  const [isVisible, toggle] = useState(false);
  const subscribe = useContext(SubscriberContext);

  useEffect(() => {
    if (isMobile()) {
      const percentage = isLandscape() ? 0.98 : 0.95;

      subscribe((scroll: number, max: number): void => {
        toggle(scroll < max * percentage);
      });
    }
  }, []);

  return (
    <div className={classList(["arrow-button", { "-show": isVisible }])}>
      <Arrow />
    </div>
  );
};

export default ArrowButton;
