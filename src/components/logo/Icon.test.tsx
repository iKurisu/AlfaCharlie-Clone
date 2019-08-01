import React from "react";
import renderer from "react-test-renderer";
import Icon from "./Icon";

it("renders correctly", (): void => {
  const component: renderer.ReactTestRenderer = renderer.create(<Icon />);

  expect(component).toMatchSnapshot();
});
