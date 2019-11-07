import React from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import Outline from "./Outline";
import Progress from "./Progress";

interface MappedState {
  menuToggled: boolean;
  hoveringElementID: number;
}

type Props = MappedState;

export const Menu = ({
  menuToggled,
  hoveringElementID
}: Props): JSX.Element => (
  <div className="menu-cursor" style={{ opacity: menuToggled ? 1 : 0 }}>
    <Outline />
    <Progress progress={hoveringElementID / 4} />
  </div>
);

const mapState = ({ menu }: AppState): MappedState => ({
  menuToggled: menu.toggled,
  hoveringElementID: menu.hoveringElementID
});

export default connect(mapState)(Menu);
