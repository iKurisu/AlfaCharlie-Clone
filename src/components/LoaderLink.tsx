import React, { MouseEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loaderActions } from "modules/loader";
import { menuActions } from "modules/menu";

interface MappedActions {
  toggleLoader: () => void;
  toggleMenu: () => void;
}

interface OwnProps extends React.HTMLAttributes<HTMLElement> {
  to: string;
}

type Props = MappedActions & OwnProps;

const LoaderLink = ({
  to,
  toggleLoader,
  toggleMenu,
  ...props
}: Props): JSX.Element => {
  const history = useHistory();

  const click = (e: MouseEvent): void => {
    e.preventDefault();

    toggleLoader();

    setTimeout(() => {
      toggleMenu();
    }, 1000);

    setTimeout(() => {
      history.push(to);
    }, 2000);
  };

  return (
    <Link {...props} to={to} onClick={click}>
      {props.children}
    </Link>
  );
};

const mapDispatch: MappedActions = {
  toggleLoader: loaderActions.toggleLoader,
  toggleMenu: menuActions.toggleMenu
};

export default connect(null, mapDispatch)(LoaderLink);
