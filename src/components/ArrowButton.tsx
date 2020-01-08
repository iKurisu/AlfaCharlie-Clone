import React, { useState, useContext, useEffect } from "react";
import Arrow from "./Arrow";
import { SubscriberContext } from "../App";
import { classList } from "utils/class";
import { isMobile } from "utils/responsive";
import "./ArrowButton.scss";

const ArrowButton = (): JSX.Element => {
  const [isVisible, toggle] = useState(false);
  const subscribe = useContext(SubscriberContext);

  useEffect(() => {
    if (isMobile()) {
      subscribe((scroll: number, max: number): void => {
        toggle(scroll < max * 0.95);
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
