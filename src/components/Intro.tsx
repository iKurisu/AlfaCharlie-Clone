import React, { useRef, useEffect } from "react";
import Symbol from "./Symbol";
import Title from "./intro/Title";
import "./Intro.scss";
import useTransition, { TransitionProps } from "hooks/useTransition";

const generateDrawLineProps = (delay: number = 0): TransitionProps => ({
  from: { strokeDashoffset: 140 },
  to: { strokeDashoffset: 0 },
  config: {
    delay,
    duration: 850,
    timing: [0.26, 0.13, 0.26, 1]
  }
});

const topLineProps = generateDrawLineProps(900);
const bottomLineProps = generateDrawLineProps();

const Intro = (): JSX.Element => {
  const topLine = useRef(null);
  const bottomLine = useRef(null);
  const letters = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const drawBottomLine = useTransition(bottomLine, bottomLineProps);
  const drawTopLine = useTransition(topLine, topLineProps);
  const lettersAnimations = letters.map(letter =>
    useTransition(letter, {
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: {
        delay: 1100,
        duration: 1200,
        timing: [0.26, 0.13, 0.25, 1]
      }
    })
  );

  const drawLines = (): void => {
    drawBottomLine();
    drawTopLine();
  };

  const showLetters = (): void => {
    lettersAnimations.forEach(animation => animation());
  };

  useEffect(() => {
    drawLines();
    showLetters();
  }, []);

  return (
    <div className="intro">
      <div className="intro-main">
        <div className="main-background" />
        <div className="main-symbol">
          <div className="symbol-wrapper">
            <Symbol
              topLine={topLine}
              bottomLine={bottomLine}
              letters={letters}
            />
          </div>
        </div>
      </div>
      <div className="intro-inverted">
        <div className="inverted-background" />
        <div className="inverted-symbol">
          <div className="symbol-mask">
            <div className="symbol-wrapper">
              <Symbol />
            </div>
          </div>
        </div>
      </div>
      <div className="intro-title">
        <Title />
      </div>
    </div>
  );
};

export default Intro;
