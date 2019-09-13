import React, { useState } from "react";
import White from "./menu/White";
import Gray from "./menu/Gray";
import Navigation from "./menu/Navigation";
import VerticalNav from "./VerticalNav";
import Slider from "./menu/Slider";
import "./Menu.scss";

interface Props {
  isOpen: boolean;
}

const Menu = ({ isOpen }: Props): JSX.Element => {
  const [hoveringElementId, setHoveringElementId] = useState(0);
  const [previousElementId, setPreviousElementId] = useState(0);

  const updateHoveringElementId = (id: number): (() => void) => (): void => {
    setHoveringElementId(id);
    setPreviousElementId(hoveringElementId);
  };

  return (
    <div className={`menu ${isOpen ? "show" : "hide"}`}>
      <Navigation
        isOpen={isOpen}
        updateHoveringElementId={updateHoveringElementId}
      />
      <Slider
        hoveringElementId={hoveringElementId}
        previousElementId={previousElementId}
      />
      <VerticalNav links={[["Instagram", false], ["Privacy", false]]} />
      <White isOpen={isOpen} />
      <Gray isOpen={isOpen} />
    </div>
  );
};

export default Menu;
