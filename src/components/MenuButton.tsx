import React, { useState } from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import { menuActions } from "modules/menu";
import Hamburger from "./menu_button/Hamburger";
import Cross from "./menu_button/Cross";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import { classList } from "utils/class";
import "./MenuButton.scss";

interface MappedState {
  toggled: boolean;
}

interface MappedActions {
  toggle: () => void;
}

type Props = MappedState & MappedActions;

export const MenuButton = ({ toggled, toggle }: Props): JSX.Element => {
  const [disabled, disable] = useState(false);

  const disableFor = (ms: number): void => {
    disable(true);
    setTimeout(() => disable(false), ms);
  };

  useDidUpdateEffect(() => {
    disableFor(2000);
  }, [toggled]);

  return (
    <div
      className={classList(["menu-button", { open: toggled, disabled }])}
      onClick={toggle}
    >
      <Hamburger />
      <Cross />
    </div>
  );
};

const mapState = ({ menu }: AppState): MappedState => ({
  toggled: menu.toggled
});

const mapDispatch: MappedActions = {
  toggle: menuActions.toggleMenu
};

export default connect(mapState, mapDispatch)(MenuButton);
