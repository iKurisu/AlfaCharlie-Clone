import React from "react";
import Hamburger from "./menu_button/Hamburger";
import Cross from "./menu_button/Cross";
import "./MenuButton.scss";

interface Props {
  menuIsOpen: boolean;
  toggle: () => void;
}

const MenuButton = ({ menuIsOpen, toggle }: Props): JSX.Element => (
  <div className={`menu-button${menuIsOpen ? " open" : ""}`} onClick={toggle}>
    <Hamburger />
    <Cross />
  </div>
);

export default MenuButton;
