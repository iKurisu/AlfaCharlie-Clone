import React from "react";
import Gray from "./menu/Gray";
import "./Menu.scss";

interface Props {
  isOpen: boolean;
}

const Menu = ({ isOpen }: Props): JSX.Element => (
  <div className={`menu ${isOpen ? "show" : "hide"}`}>
    <Gray isOpen={isOpen} />
  </div>
);

export default Menu;
