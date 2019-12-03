import React from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import Outline from "./Outline";
import Progress from "./Progress";

interface MappedState {
  menuToggled: boolean;
}

type Props = MappedState;

export const Scroll = ({ menuToggled }: Props): JSX.Element => (
  <div className="scroll-cursor" style={{ opacity: menuToggled ? 0 : 1 }}>
    <Outline />
    <Progress progress={0} />
  </div>
);

const mapState = ({ menu }: AppState): MappedState => ({
  menuToggled: menu.toggled
});

export default connect(mapState)(Scroll);
