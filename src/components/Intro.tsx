import React, { useRef, useEffect } from "react";
import Symbol from "./Symbol";
import Title from "./intro/Title";
import useTransition, { TransitionProps } from "hooks/useTransition";
import { linear, ease, easeInOut, easeOut, easeOut2 } from "utils/timings";
import {
  fadeIn,
  fadeOut,
  slideFromLeft,
  slideFromTop,
  slideFromBottom,
  slideToRight
} from "utils/transitions";
import "./Intro.scss";

const generateDrawLineProps = (delay: number = 0): TransitionProps => ({
  from: { strokeDashoffset: 140 },
  to: { strokeDashoffset: 0 },
  config: {
    delay,
    duration: 850,
    timing: ease
  }
});

const generateHideLineProps = (delay: number = 0): TransitionProps => ({
  from: { strokeDashoffset: 0, opacity: 1 },
  to: { strokeDashoffset: 141, opacity: 0 },
  config: {
    delay: delay,
    duration: 400,
    timing: ease
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
      timing: easeOut
    }
  });

  const drawBottomLine = useTransition(bottomLine, drawBottomLineProps);
  const hideBottomLine = useTransition(invertedBottomLine, hideBottomLineProps);
  const drawTopLine = useTransition(topLine, drawTopLineProps);
  const hideTopLine = useTransition(invertedTopLine, hideTopLineProps);

  const lettersAnimations = letters.map(letter =>
    useTransition(letter, {
      ...fadeIn,
      config: {
        delay: 1100,
        duration: 1200,
        timing: ease
      }
    })
  );

  const invertedLettersAnimations = invertedSymbolLetters.map(letter =>
    useTransition(letter, {
      ...fadeOut,
      config: {
        duration: 1200,
        timing: ease
      }
    })
  );

  const slideBackground = useTransition(invertedBackground, {
    ...slideFromLeft,
    config: {
      duration: 800,
      delay: 400,
      timing: easeInOut
    }
  });

  const rotateSymbolContainer = useTransition(invertedSymbolContainer, {
    from: { transform: "rotate(0)" },
    to: { transform: "rotate(-90deg)" },
    config: {
      duration: 1100,
      timing: easeOut
    }
  });

  const revealSymbol = useTransition(symbolMask, {
    ...slideFromTop,
    config: {
      duration: 75,
      delay: 750,
      timing: ease
    }
  });

  const slideSymbol = useTransition(invertedSymbol, {
    ...slideFromBottom,
    config: {
      duration: 75,
      delay: 750,
      timing: ease
    }
  });

  const rotateInvertedSymbol = useTransition(invertedSymbol, {
    from: { transform: "rotate(0)" },
    to: { transform: "rotate(-35deg)" },
    config: {
      duration: 1100,
      timing: easeOut2
    }
  });

  const fadeInTopTitle = useTransition(topTitle, {
    ...fadeIn,
    config: {
      duration: 2000,
      timing: ease
    }
  });

  const scaleTitle = useTransition(title, {
    from: { transform: "scale(0.95)" },
    to: { transform: "scale(1)" },
    config: {
      duration: 2000,
      timing: linear
    }
  });

  const fadeInBottomLeftTitle = useTransition(bottomLeftTitle, {
    ...fadeIn,
    config: {
      duration: 1500,
      delay: 400,
      timing: ease
    }
  });

  const fadeInBottomRightTitle = useTransition(bottomRightTitle, {
    ...fadeIn,
    config: {
      duration: 1400,
      delay: 600,
      timing: ease
    }
  });

  const hideMainBackground = useTransition(mainBackground, {
    ...fadeOut,
    config: { duration: 0 }
  });

  const hideSymbol = useTransition(symbol, {
    ...fadeOut,
    config: { duration: 0 }
  });

  const slideOutInvertedBackground = useTransition(invertedBackground, {
    ...slideToRight,
    config: {
      duration: 800,
      timing: easeInOut
    }
  });

  const slideOutTitle = useTransition(title, {
    from: { transform: "translateX(0)" },
    to: { transform: "translateX(20%)" },
    config: {
      duration: 1000,
      timing: easeInOut
    }
  });

  const hideTitle = useTransition(title, {
    ...fadeOut,
    config: {
      duration: 500,
      timing: easeInOut
    }
  });

  const hideLines = (): void => {
    hideBottomLine();
    hideTopLine();
  };

  const showLetters = (): void => {
    lettersAnimations.forEach(animation => animation());
  };

  const showSymbol = (): void => {
    drawBottomLine();
    drawTopLine();
    showLetters();
  };

  const rotateBothSymbols = async (): Promise<void> => {
    rotateSymbolContainer();
    return await secondRotation();
  };

  const invert = (): void => {
    slideBackground();
    revealSymbol();
    slideSymbol();
  };

  const hideLetters = (): void => {
    invertedLettersAnimations.forEach(animation => animation());
  };

  const hideInvertedSymbol = (): void => {
    hideLines();
    hideLetters();
  };

  const fadeInTitle = (): void => {
    fadeInTopTitle();
    fadeInBottomLeftTitle();
    fadeInBottomRightTitle();
  };

  const hideIntro = (): void => {
    hideMainBackground();
    hideSymbol();
    slideOutInvertedBackground();
    slideOutTitle();
    hideTitle();
  };

  useEffect(() => {
    showSymbol();
    firstRotation().then(() => {
      invert();
      rotateBothSymbols().then(() => {
        rotateInvertedSymbol().then(() => {
          fadeInTitle();
          scaleTitle().then(hideIntro);
        });
        hideInvertedSymbol();
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
