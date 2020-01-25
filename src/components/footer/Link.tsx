import React, { MouseEvent, RefObject } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import useTransition from "hooks/useTransition";
import { easeInOut } from "utils/timings";
import { loaderActions } from "modules/loader";

interface MappedActions {
  toggleLoader: () => void;
}

interface OwnProps {
  to: string;
  footerRef: RefObject<HTMLDivElement>;
  backgroundRef: RefObject<HTMLDivElement>;
  fadeOutText: () => void;
}

type Props = MappedActions & OwnProps;

const FooterLink = ({
  to,
  footerRef,
  backgroundRef,
  fadeOutText,
  toggleLoader
}: Props): JSX.Element => {
  const history = useHistory();

  const bringToFront = useTransition(footerRef, {
    from: { zIndex: 200 },
    to: { zIndex: 200 },
    config: {
      duration: 0
    }
  });

  const expandBackground = useTransition(backgroundRef, {
    from: { height: "50%" },
    to: { height: "100%" },
    config: {
      duration: 1000,
      delay: 500,
      timing: easeInOut
    }
  });

  const click = (e: MouseEvent): void => {
    e.preventDefault();

    bringToFront();
    expandBackground();
    fadeOutText();
  };

  return <Link to={to} onClick={click} />;
};

const mapDispatch: MappedActions = {
  toggleLoader: loaderActions.toggleFooterLoader
};

export default connect(null, mapDispatch)(FooterLink);
