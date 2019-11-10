import React, { MouseEventHandler } from "react";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "store";
import { menuActions } from "modules/menu";
import White from "./menu/White";
import Gray from "./menu/Gray";
import Navigation from "./menu/Navigation";
import VerticalNav from "./VerticalNav";
import Images from "./menu/Images";
import "./Menu.scss";

interface MappedState {
  isOpen: boolean;
  hoveringElementID: number;
  previousElementID: number;
}

interface MappedActions {
  hoverElement: (elementID: number) => MouseEventHandler;
}

type Props = MappedState & MappedActions;

export const Menu = ({
  isOpen,
  hoveringElementID,
  previousElementID,
  hoverElement
}: Props): JSX.Element => {
  return (
    <div className={`menu ${isOpen ? "show" : "hide"}`}>
      <Navigation isOpen={isOpen} hoverElement={hoverElement} />
      <Images
        isOpen={isOpen}
        hoveringElementID={hoveringElementID}
        previousElementID={previousElementID}
      />
      <VerticalNav
        links={[["Instagram", false], ["Privacy", false]]}
        show={isOpen}
      />
      <White isOpen={isOpen} />
      <Gray isOpen={isOpen} />
    </div>
  );
};

const mapState = ({ menu }: AppState): MappedState => ({
  isOpen: menu.toggled,
  hoveringElementID: menu.hoveringElementID,
  previousElementID: menu.previousElementID
});

const mapDispatch = (
  dispatch: ThunkDispatch<AppState, void, AnyAction>
): MappedActions => ({
  hoverElement: (elementID: number): React.MouseEventHandler => (): void => {
    dispatch(menuActions.hoverElement(elementID, 2000));
  }
});

export default connect(
  mapState,
  mapDispatch
)(Menu);
