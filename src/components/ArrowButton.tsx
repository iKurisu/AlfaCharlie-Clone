import React, { useState, useContext, useEffect } from "react";
import Arrow from "./Arrow";
import { ScrollContext } from "../App";
import { classList } from "utils/class";
import { isLandscape, isMobile } from "utils/responsive";
import "./ArrowButton.scss";

const ArrowButton = (): JSX.Element => {
  const [isVisible, toggle] = useState(false);
  const {
    subscriber: [subscribe, unsubscribe]
  } = useContext(ScrollContext);

  const percentage = isLandscape() ? 0.98 : 0.95;

  const toggleArrow = (scroll: number, max: number): void => {
    toggle(scroll < max * percentage);
  };

  useEffect(() => {
    if (isMobile()) subscribe(toggleArrow);

    return () => unsubscribe(toggleArrow);
  }, []);

  return (
    <div className={classList(["arrow-button", { "-show": isVisible }])}>
      <Arrow />
    </div>
  );
};

export default ArrowButton;
