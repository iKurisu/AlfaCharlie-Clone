import React, { useRef } from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import Inverted from "./Inverted";
import { loaderActions } from "modules/loader";
import useTransition, { TransitionProps } from "hooks/useTransition";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import {
  slideFromLeft,
  fadeIn,
  slideToRight,
  fadeOut
} from "utils/transitions";
import { easeInOut, ease, easeOut2, easeOut } from "utils/timings";
import "./Loader.scss";

interface MappedState {
  toggled: boolean;
}

interface MappedActions {
  toggle: () => void;
}

type Props = MappedState & MappedActions;

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

const Loader = ({ toggled, toggle }: Props): JSX.Element => {
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

  const fadeInContainer = useTransition(invertedSymbolContainer, {
    ...fadeIn,
    config: {
      duration: 200,
      delay: 400,
      timing: ease
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

  const fadeInLettersAnimations = invertedSymbolLetters.map(letter =>
    useTransition(letter, {
      ...fadeIn,
      config: {
        duration: 2000,
        timing: easeOut
      }
    })
  );

  const resetLine = {
    from: { strokeDashoffset: 0 },
    to: { strokeDashoffset: 141 },
    config: { duration: 0 }
  };

  const resetTopLine = useTransition(invertedTopLine, resetLine);
  const resetBottomLine = useTransition(invertedBottomLine, resetLine);

  const resetLettersAnimations = invertedSymbolLetters.map(letter =>
    useTransition(letter, {
      ...fadeOut,
      config: { duration: 0 }
    })
  );

  const resetContainer = useTransition(invertedSymbolContainer, {
    ...fadeOut,
    config: { duration: 0 }
  });

  const fadeInLetters = (): void => {
    fadeInLettersAnimations.forEach(animation => animation());
  };

  const drawLines = (): void => {
    drawTopLine();
    drawBottomLine();
  };

  const drawSymbol = (): void => {
    drawLines();
    fadeInLetters();
  };

  const resetLines = (): void => {
    resetTopLine();
    resetBottomLine();
  };

  const resetLetters = (): void => {
    resetLettersAnimations.forEach(animation => animation());
  };

  const performTransition = async (): Promise<void> => {
    slideInBackground();
    fadeInContainer();
    drawSymbol();

    await firstRotation();

    secondRotation();
    toggle();

    await slideOutBackground();

    resetLines();
    resetLetters();
    resetContainer();
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

const mapDispatch: MappedActions = {
  toggle: loaderActions.toggleLoader
};

export default connect(mapState, mapDispatch)(Loader);
