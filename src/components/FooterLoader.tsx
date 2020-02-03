import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import Chars from "./Chars";
import useTransition from "hooks/useTransition";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import { classList } from "utils/class";
import { slideToTop, slideFromTop } from "utils/transitions";
import { easeInOut } from "utils/timings";
import "./FooterLoader.scss";
import { loaderActions } from "modules/loader";
import { useRouteMatch } from "react-router-dom";
import { findNextTitle } from "utils/projects";

interface MappedState {
  toggled: boolean;
}

interface MappedActions {
  toggle: () => void;
}

type Props = MappedState & MappedActions;

interface Params {
  project: string;
}

const FooterLoader = ({ toggled, toggle }: Props): JSX.Element => {
  const loader = useRef(null);
  const match = useRouteMatch<Params>("/projects/:project");
  const [text, setText] = useState(
    match ? findNextTitle(match.params.project) : "Let’s work together."
  );

  const slideOut = useTransition(loader, {
    ...slideToTop,
    config: {
      duration: 800,
      delay: 1300,
      timing: easeInOut
    }
  });

  const reset = useTransition(loader, {
    ...slideFromTop,
    config: { duration: 0 }
  });

  useDidUpdateEffect((): void => {
    if (toggled) {
      slideOut().then(toggle);
    } else {
      reset().then(() => {
        setText(
          match ? findNextTitle(match.params.project) : "Let’s work together."
        );
      });
    }
  }, [toggled]);

  useDidUpdateEffect((): void => {
    if (!match) setText("Let’s work together.");
  }, [match]);

  return (
    <div
      className={classList(["footer-loader", { "-show": toggled }])}
      ref={loader}
    >
      <h3>
        <Chars footer text={text} toggled={toggled} />
      </h3>
    </div>
  );
};

const mapState = ({ loader }: AppState): MappedState => ({
  toggled: loader.footer
});

const mapDispatch: MappedActions = {
  toggle: loaderActions.toggleFooterLoader
};

export default connect(mapState, mapDispatch)(FooterLoader);
