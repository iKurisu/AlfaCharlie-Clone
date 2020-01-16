import React from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import Outline from "./Outline";
import Progress from "./Progress";
import { Cursor } from "modules/cursor/types";
import { classList } from "utils/class";

interface MappedState {
  menuToggled: boolean;
  cursor: Cursor;
  hoveringElementID: number;
}

type Props = MappedState;

export const Menu = ({
  menuToggled,
  hoveringElementID,
  cursor
}: Props): JSX.Element => (
  <div
    className={classList([
      "menu-cursor",
      { "-show": menuToggled || cursor === Cursor.SLIDER }
    ])}
  >
    <Outline />
    <Progress progress={hoveringElementID / 5} />
  </div>
);

const mapState = ({ menu, cursor }: AppState): MappedState => ({
  cursor,
  menuToggled: menu.toggled,
  hoveringElementID: menu.hoveringElementID
});

export default connect(mapState)(Menu);
