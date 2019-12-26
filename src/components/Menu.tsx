import React from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import White from "./menu/White";
import Gray from "./menu/Gray";
import Navigation from "./menu/Navigation";
import VerticalNav from "./VerticalNav";
import Images from "./menu/Images";
import "./Menu.scss";

interface MappedState {
  isOpen: boolean;
}

type Props = MappedState;

export const Menu = ({ isOpen }: Props): JSX.Element => (
  <div className={`menu ${isOpen ? "show" : "hide"}`}>
    <Navigation isOpen={isOpen} />
    <Images isOpen={isOpen} />
    <VerticalNav menu={true} show={isOpen} delay={1400} />
    <White isOpen={isOpen} />
    <Gray isOpen={isOpen} />
  </div>
);

const mapState = ({ menu }: AppState): MappedState => ({
  isOpen: menu.toggled
});

export default connect(mapState)(Menu);
