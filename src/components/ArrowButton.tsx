import React, { useState, useContext, useEffect } from "react";
import Arrow from "./Arrow";
import { ScrollContext } from "../App";
import { classList } from "utils/class";
import { isMobile } from "utils/responsive";
import "./ArrowButton.scss";

const ArrowButton = (): JSX.Element => {
  const [isVisible, toggle] = useState(false);
  const {
    subscriber: [subscribe, unsubscribe]
  } = useContext(ScrollContext);

  const toggleArrow = (scroll: number, max: number): void => {
    toggle(scroll < max + window.innerHeight * 0.2);
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
