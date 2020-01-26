import React, { MouseEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loaderActions } from "modules/loader";

interface MappedActions {
  toggleLoader: () => void;
}

interface OwnProps {
  to: string;
  hideFooter: () => Promise<void>;
}

type Props = MappedActions & OwnProps;

const FooterLink = ({ to, hideFooter, toggleLoader }: Props): JSX.Element => {
  const history = useHistory();

  const click = (e: MouseEvent): void => {
    e.preventDefault();

    hideFooter().then(() => {
      toggleLoader();
      history.push(to);
    });
  };

  return <Link to={to} onClick={click} />;
};

const mapDispatch: MappedActions = {
  toggleLoader: loaderActions.toggleFooterLoader
};

export default connect(null, mapDispatch)(FooterLink);
