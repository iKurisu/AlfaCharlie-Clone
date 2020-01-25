import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import { classList } from "utils/class";
import "./FooterLoader.scss";
import useTransition from "hooks/useTransition";
import { slideToTop } from "utils/transitions";
import { easeInOut } from "utils/timings";
import Chars from "./Chars";

interface MappedState {
  toggled: boolean;
}

type Props = MappedState;

const FooterLoader = ({ toggled }: Props): JSX.Element => {
  const loader = useRef(null);

  const slideOut = useTransition(loader, {
    ...slideToTop,
    config: {
      duration: 1000,
      delay: 1000,
      timing: easeInOut
    }
  });

  useEffect((): void => {
    if (toggled) slideOut();
  }, [toggled]);

  return (
    <div
      className={classList(["footer-loader", { "-show": toggled }])}
      ref={loader}
    >
      <h3>
        <Chars text="Let’s work together." toggled={toggled} />
      </h3>
    </div>
  );
};

const mapState = ({ loader }: AppState): MappedState => ({
  toggled: loader.footer
});

export default connect(mapState)(FooterLoader);
