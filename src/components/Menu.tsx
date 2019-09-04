import React from "react";
import White from "./menu/White";
import Gray from "./menu/Gray";
import "./Menu.scss";

interface Props {
  isOpen: boolean;
}

const Menu = ({ isOpen }: Props): JSX.Element => (
  <div className={`menu ${isOpen ? "show" : "hide"}`}>
    <White isOpen={isOpen} />
    <Gray isOpen={isOpen} />
  </div>
);

export default Menu;
