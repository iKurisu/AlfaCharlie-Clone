import React, { MouseEvent, RefObject } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import useTransition from "hooks/useTransition";
import { ease } from "utils/timings";
import { loaderActions } from "modules/loader";

interface MappedActions {
  toggleLoader: () => void;
}

interface OwnProps {
  to: string;
  footerRef: RefObject<HTMLDivElement>;
}

type Props = MappedActions & OwnProps;

const FooterLink = ({ to, footerRef, toggleLoader }: Props): JSX.Element => {
  const history = useHistory();

  const increaseHeight = useTransition(footerRef, {
    from: { height: "50%", zIndex: 200 },
    to: { height: "100%", zIndex: 200 },
    config: {
      duration: 1000,
      timing: ease
    }
  });

  const fadeOut = useTransition(footerRef, {
    from: { transform: "translateY(0)" },
    to: { transform: "translateY(-100%)" },
    config: {
      duration: 2000,
      delay: 1000,
      timing: ease
    }
  });

  const click = (e: MouseEvent): void => {
    e.preventDefault();

    increaseHeight().then(() => {
      history.push(to);
      toggleLoader();
    });
  };

  return <Link to={to} onClick={click} />;
};

const mapDispatch: MappedActions = {
  toggleLoader: loaderActions.toggleFooterLoader
};

export default connect(null, mapDispatch)(FooterLink);
