import React from "react";
import renderer from "react-test-renderer";
import Logo from "./Logo";

it("renders correctly", (): void => {
  const component: renderer.ReactTestRenderer = renderer.create(<Logo />);

  expect(component).toMatchSnapshot();
});
