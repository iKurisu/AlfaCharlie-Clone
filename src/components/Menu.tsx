import React from "react";
import "./Menu.scss";

interface Props {
  isOpen: boolean;
}

const Menu = ({ isOpen }: Props): JSX.Element => (
  <div className={`menu ${isOpen ? "show" : "hide"}`}>
    <div className="menu-white" />
    <div className="menu-gray" />
  </div>
);

export default Menu;
