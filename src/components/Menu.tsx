import React from "react";
import White from "./menu/White";
import Gray from "./menu/Gray";
import Navigation from "./menu/Navigation";
import VerticalNav from "./VerticalNav";
import Slider from "./menu/Slider";
import "./Menu.scss";

interface Props {
  isOpen: boolean;
}

const Menu = ({ isOpen }: Props): JSX.Element => (
  <div className={`menu ${isOpen ? "show" : "hide"}`}>
    <Navigation />
    <Slider />
    <VerticalNav links={[["Instagram", false], ["Privacy", false]]} />
    <White isOpen={isOpen} />
    <Gray isOpen={isOpen} />
  </div>
);

export default Menu;
