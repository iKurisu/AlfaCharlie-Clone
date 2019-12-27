import React from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import { menuActions } from "modules/menu";
import Hamburger from "./menu_button/Hamburger";
import Cross from "./menu_button/Cross";
import "./MenuButton.scss";

interface MappedState {
  toggled: boolean;
}

interface MappedActions {
  toggle: typeof menuActions.toggleMenu;
}

type Props = MappedState & MappedActions;

export const MenuButton = ({ toggled, toggle }: Props): JSX.Element => (
  <div className={`menu-button${toggled ? " open" : ""}`} onClick={toggle}>
    <Hamburger />
    <Cross />
  </div>
);

const mapState = (state: AppState): MappedState => ({
  toggled: state.menu.toggled
});

const mapDispatch: MappedActions = {
  toggle: menuActions.toggleMenu
};

export default connect(mapState, mapDispatch)(MenuButton);
