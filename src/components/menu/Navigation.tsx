import React, { useRef, MouseEventHandler } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { menuActions } from "modules/menu";
import Home from "./navigation/Home";
import Link from "./navigation/Link";
import useTransition from "hooks/useTransition";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import { getDuration } from "utils/slider";
import "./Navigation.scss";
import { AppState } from "store";

interface MappedState {
  currentSlideID: number;
}

interface MappedActions {
  swipeSlide: (elementID: number, duration: number) => MouseEventHandler;
}

interface OwnProps {
  isOpen: boolean;
}

type Props = MappedState & MappedActions & OwnProps;

export const Navigation = ({
  isOpen,
  currentSlideID,
  swipeSlide
}: Props): JSX.Element => {
  const links = ["agency", "work", "journal", "contact"];

  const nav = useRef(null);

  const fadeIn = useTransition(nav, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      delay: 800,
      duration: 900,
      timing: [0.28, 1, 0.5, 1]
    }
  });

  const fadeOut = useTransition(nav, {
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: {
      duration: 1000,
      timing: [0.28, 1, 0.5, 1]
    }
  });

  useDidUpdateEffect((): void => {
    if (isOpen) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [isOpen]);

  return (
    <div className="menu-nav-wrapper -flex">
      <Home isOpen={isOpen} />
      <nav
        className="menu-nav-links -flex"
        onMouseLeave={swipeSlide(
          0,
          getDuration({ from: currentSlideID, to: 0, max: 2000 })
        )}
        style={{ opacity: 0 }}
        ref={nav}
      >
        {links.map(
          (link: string, id: number): JSX.Element => (
            <Link
              link={link}
              isOpen={isOpen}
              swipeSlide={swipeSlide(
                id + 1,
                getDuration({ from: currentSlideID, to: id + 1, max: 2000 })
              )}
              key={id}
            />
          )
        )}
      </nav>
    </div>
  );
};

const mapState = ({ menu }: AppState): MappedState => ({
  currentSlideID: menu.hoveringElementID
});

const mapDispatch = (dispatch: Dispatch): MappedActions => ({
  swipeSlide: (
    elementID: number,
    duration: number
  ): MouseEventHandler => (): void => {
    dispatch(menuActions.setSlide(elementID));

    setTimeout(() => dispatch(menuActions.updatePreviousSlide()), duration);
  }
});

export default connect(mapState, mapDispatch)(Navigation);
