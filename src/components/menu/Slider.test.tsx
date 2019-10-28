import React from "react";
import renderer from "react-test-renderer";
import Slider from "./Slider";

it("renders correctly", (): void => {
  const component = renderer.create(
    <Slider isOpen={true} hoveringElementId={0} previousElementId={0} />
  );
  expect(component).toMatchSnapshot();
});
