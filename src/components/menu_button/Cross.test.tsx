import React from "react";
import renderer from "react-test-renderer";
import Cross from "./Cross";

it("renders correctly", (): void => {
  const cross: renderer.ReactTestRenderer = renderer.create(<Cross />);

  expect(cross).toMatchSnapshot();
});
