import React from "react";
import renderer from "react-test-renderer";
import Hamburger from "./Hamburger";

it("renders correctly", (): void => {
  const hamburger: renderer.ReactTestRenderer = renderer.create(<Hamburger />);

  expect(hamburger).toMatchSnapshot();
});
