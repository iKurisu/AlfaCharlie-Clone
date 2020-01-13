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

const generateHideLineProps = (delay: number = 0): TransitionProps => ({
  from: { strokeDashoffset: 0, opacity: 1 },
  to: { strokeDashoffset: 141, opacity: 0 },
  config: {
    delay: 1100 + delay,
    duration: 400,
    timing: [0.26, 0.13, 0.26, 1]
  }
});

const drawTopLineProps = generateDrawLineProps(900);
const hideTopLineProps = generateHideLineProps();
const drawBottomLineProps = generateDrawLineProps();
const hideBottomLineProps = generateHideLineProps(350);

const Intro = (): JSX.Element => {
  const mainBackground = useRef(null);
  const symbol = useRef(null);
  const topLine = useRef(null);
  const bottomLine = useRef(null);
  const letters = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const invertedBackground = useRef(null);
  const invertedSymbolContainer = useRef(null);
  const symbolMask = useRef(null);

  const invertedSymbol = useRef(null);
  const invertedTopLine = useRef(null);
  const invertedBottomLine = useRef(null);
  const invertedSymbolLetters = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const title = useRef(null);
  const topTitle = useRef(null);
  const bottomLeftTitle = useRef(null);
  const bottomRightTitle = useRef(null);

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
      timing: [0.1, 0.4, 0.3, 0.92]
    }
  });

  const drawBottomLine = useTransition(bottomLine, drawBottomLineProps);
  const hideBottomLine = useTransition(invertedBottomLine, hideBottomLineProps);
  const drawTopLine = useTransition(topLine, drawTopLineProps);
  const hideTopLine = useTransition(invertedTopLine, hideTopLineProps);

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

  const invertedLettersAnimations = invertedSymbolLetters.map(letter =>
    useTransition(letter, {
      from: { opacity: 1 },
      to: { opacity: 0 },
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
      timing: [0.1, 0.4, 0.3, 0.92]
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

  const rotateInvertedSymbol = useTransition(invertedSymbol, {
    from: { transform: "rotate(0)" },
    to: { transform: "rotate(-35deg)" },
    config: {
      duration: 1100,
      timing: [0.1, 0.5, 0.3, 0.92]
    }
  });

  const fadeInTopTitle = useTransition(topTitle, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 2000,
      timing: [0.26, 0.13, 0.25, 1]
    }
  });

  const scaleTitle = useTransition(title, {
    from: { transform: "scale(0.95)" },
    to: { transform: "scale(1)" },
    config: {
      duration: 2000,
      timing: [0, 0, 1, 1]
    }
  });

  const fadeInBottomLeftTitle = useTransition(bottomLeftTitle, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 1500,
      delay: 400,
      timing: [0.26, 0.13, 0.25, 1]
    }
  });

  const fadeInBottomRightTitle = useTransition(bottomRightTitle, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 1400,
      delay: 600,
      timing: [0.26, 0.13, 0.25, 1]
    }
  });

  const hideMainBackground = useTransition(mainBackground, {
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: { duration: 0 }
  });

  const hideSymbol = useTransition(symbol, {
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: { duration: 0 }
  });

  const slideOutInvertedBackground = useTransition(invertedBackground, {
    from: { transform: "translateX(0)" },
    to: { transform: "translateX(100%)" },
    config: {
      duration: 800,
      timing: [0.7, 0.05, 0.16, 0.95]
    }
  });

  const hideTitle = useTransition(title, {
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: {
      duration: 500,
      timing: [0.7, 0.05, 0.16, 0.95]
    }
  });

  const drawLines = (): void => {
    drawBottomLine();
    drawTopLine();
  };

  const hideLines = (): void => {
    hideBottomLine();
    hideTopLine();
  };

  const showLetters = (): void => {
    lettersAnimations.forEach(animation => animation());
  };

  const hideLetters = (): void => {
    invertedLettersAnimations.forEach(animation => animation());
  };

  useEffect(() => {
    drawLines();
    showLetters();

    firstRotation().then(() => {
      rotateSymbolContainer();
      slideBackground();
      revealSymbol();
      slideSymbol();
      hideLines();
      hideLetters();

      secondRotation().then(() => {
        rotateInvertedSymbol().then(() => {
          fadeInTopTitle();
          fadeInBottomLeftTitle();
          fadeInBottomRightTitle();
          scaleTitle().then(() => {
            hideMainBackground();
            hideSymbol();
            slideOutInvertedBackground();
            hideTitle();
          });
        });
      });
    });
  }, []);

  return (
    <div className="intro">
      <div className="intro-main">
        <div className="main-background" ref={mainBackground} />
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
              <Symbol
                symbol={invertedSymbol}
                topLine={invertedTopLine}
                bottomLine={invertedBottomLine}
                letters={invertedSymbolLetters}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="intro-title" ref={title}>
        <Title
          top={topTitle}
          bottomLeft={bottomLeftTitle}
          bottomRight={bottomRightTitle}
        />
      </div>
    </div>
  );
};

export default Intro;
