import React from "react";
import renderer from "react-test-renderer";
import Navigation from "./Navigation";

it("renders correctly", (): void => {
  const component = renderer.create(<Navigation />);

  expect(component).toMatchSnapshot();
});
