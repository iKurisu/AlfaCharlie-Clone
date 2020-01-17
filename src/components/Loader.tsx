import React, { useRef } from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import Inverted from "./Inverted";
import useTransition, { TransitionProps } from "hooks/useTransition";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import { slideFromLeft, fadeIn, slideToRight } from "utils/transitions";
import { easeInOut, ease, easeOut2 } from "utils/timings";
import "./Loader.scss";

interface MappedState {
  toggled: boolean;
}

type Props = MappedState;

const generateDrawLineProps = (delay: number = 0): TransitionProps => ({
  from: { strokeDashoffset: 140 },
  to: { strokeDashoffset: 0 },
  config: {
    delay,
    duration: 800,
    timing: ease
  }
});

const drawTopLineProps = generateDrawLineProps();
const drawBottomLineProps = generateDrawLineProps(700);

const Loader = ({ toggled }: Props): JSX.Element => {
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

  const slideInBackground = useTransition(invertedBackground, {
    ...slideFromLeft,
    config: {
      duration: 900,
      timing: easeInOut
    }
  });

  const slideOutBackground = useTransition(invertedBackground, {
    ...slideToRight,
    config: {
      duration: 900,
      delay: 300,
      timing: easeInOut
    }
  });

  const firstRotation = useTransition(invertedSymbol, {
    from: { transform: "rotate(30deg)", opacity: 0.6 },
    to: { transform: "rotate(0)", opacity: 0.8 },
    config: {
      duration: 2000
    }
  });

  const secondRotation = useTransition(invertedSymbol, {
    from: { transform: "rotate(0)", opacity: 0.8 },
    to: { transform: "rotate(-25deg)", opacity: 0 },
    config: {
      duration: 800,
      timing: easeOut2
    }
  });

  const drawBottomLine = useTransition(invertedBottomLine, drawBottomLineProps);
  const drawTopLine = useTransition(invertedTopLine, drawTopLineProps);

  const lettersAnimations = invertedSymbolLetters.map(letter =>
    useTransition(letter, {
      ...fadeIn,
      config: {
        duration: 2000,
        delay: 0,
        timing: ease
      }
    })
  );

  const fadeInLetters = (): void => {
    lettersAnimations.forEach(animation => animation());
  };

  const drawLines = (): void => {
    drawTopLine();
    drawBottomLine();
  };

  const drawSymbol = (): void => {
    drawLines();
    fadeInLetters();
  };

  const performTransition = async (): Promise<void> => {
    slideInBackground();
    drawSymbol();

    await firstRotation();

    secondRotation();
    slideOutBackground();
  };

  useDidUpdateEffect((): void => {
    if (toggled) performTransition();
  }, [toggled]);

  return (
    <div className="loader">
      <Inverted
        invertedBackground={invertedBackground}
        invertedSymbolContainer={invertedSymbolContainer}
        symbolMask={symbolMask}
        invertedSymbol={invertedSymbol}
        invertedTopLine={invertedTopLine}
        invertedBottomLine={invertedBottomLine}
        invertedSymbolLetters={invertedSymbolLetters}
      />
    </div>
  );
};

const mapState = ({ loader }: AppState): MappedState => ({
  toggled: loader.toggled
});

export default connect(mapState)(Loader);
