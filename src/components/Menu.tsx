import React from "react";
import White from "./menu/White";
import Gray from "./menu/Gray";
import Navigation from "./menu/Navigation";
import "./Menu.scss";

interface Props {
  isOpen: boolean;
}

const Menu = ({ isOpen }: Props): JSX.Element => (
  <div className={`menu ${isOpen ? "show" : "hide"}`}>
    {/* <div className="menu-nav-wrapper">
      <nav className="menu-nav-links"></nav>
    </div> */}
    <Navigation />
    <White isOpen={isOpen} />
    <Gray isOpen={isOpen} />
  </div>
);

export default Menu;
