import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AppState } from "store";
import { menuActions } from "modules/menu";
import Hamburger from "./menu_button/Hamburger";
import Cross from "./menu_button/Cross";
import { classList } from "utils/class";
import "./MenuButton.scss";

interface MappedState {
  toggled: boolean;
  onTransition: boolean;
}

interface MappedActions {
  toggle: (toggled: boolean) => () => void;
}

type Props = MappedState & MappedActions;

export const MenuButton = ({
  toggled,
  onTransition,
  toggle
}: Props): JSX.Element => (
  <div
    className={classList([
      "menu-button",
      { open: toggled, disabled: onTransition }
    ])}
    onClick={toggle(toggled)}
  >
    <Hamburger />
    <Cross />
  </div>
);

const mapState = ({ menu }: AppState): MappedState => ({
  toggled: menu.toggled,
  onTransition: menu.onTransition
});

const mapDispatch = (dispatch: Dispatch): MappedActions => ({
  toggle: toggled => () => {
    dispatch(menuActions.toggleMenu());
    setTimeout(
      () => dispatch(menuActions.endTransition()),
      toggled ? 1300 : 2300
    );
  }
});

export default connect(mapState, mapDispatch)(MenuButton);
