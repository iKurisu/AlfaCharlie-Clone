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
  const symbol = useRef(null);
  const topLine = useRef(null);
  const bottomLine = useRef(null);
  const letters = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const invertedBackground = useRef(null);
  const invertedSymbolContainer = useRef(null);
  const symbolMask = useRef(null);
  const invertedSymbol = useRef(null);

  const firstRotation = useTransition(symbol, {
    from: { transform: "rotate(30deg)" },
    to: { transform: "rotate(0)" },
    config: {
      duration: 2000
    }
  });

  const secondRotation = useTransition(symbol, {
    from: { transform: "rotate(0)" },
    to: { transform: "rotate(-90deg)" },
    config: {
      duration: 1100,
      timing: [0.1, 0.4, 0.3, 1]
    }
  });

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

  const slideBackground = useTransition(invertedBackground, {
    from: { transform: "translateX(-100%)" },
    to: { transform: "translateX(0)" },
    config: {
      duration: 800,
      delay: 400,
      timing: [0.7, 0.05, 0.16, 0.95]
    }
  });

  const rotateSymbolContainer = useTransition(invertedSymbolContainer, {
    from: { transform: "rotate(0)" },
    to: { transform: "rotate(-90deg)" },
    config: {
      duration: 1100,
      timing: [0.1, 0.4, 0.3, 1]
    }
  });

  const revealSymbol = useTransition(symbolMask, {
    from: { transform: "translateY(-100%)" },
    to: { transform: "translateY(0)" },
    config: {
      duration: 75,
      delay: 750,
      timing: [0.26, 0.13, 0.25, 1]
    }
  });

  const slideSymbol = useTransition(invertedSymbol, {
    from: { transform: "translateY(100%)" },
    to: { transform: "translateY(0)" },
    config: {
      duration: 75,
      delay: 750,
      timing: [0.26, 0.13, 0.25, 1]
    }
  });

  const drawLines = (): void => {
    drawBottomLine();
    drawTopLine();
  };

  const showLetters = (): void => {
    lettersAnimations.forEach(animation => animation());
  };

  useEffect(() => {
    firstRotation().then(() => {
      secondRotation();
      rotateSymbolContainer();
      slideBackground();
      revealSymbol();
      slideSymbol();
    });
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
              symbol={symbol}
              topLine={topLine}
              bottomLine={bottomLine}
              letters={letters}
            />
          </div>
        </div>
      </div>
      <div className="intro-inverted">
        <div className="inverted-background" ref={invertedBackground} />
        <div className="inverted-symbol" ref={invertedSymbolContainer}>
          <div className="symbol-mask" ref={symbolMask}>
            <div className="symbol-wrapper">
              <Symbol symbol={invertedSymbol} />
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
