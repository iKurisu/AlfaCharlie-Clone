import React from "react";
import App from "./App";
import renderer from "react-test-renderer";

it("renders correctly", (): void => {
  const component: renderer.ReactTestRenderer = renderer.create(<App />);
  expect(component).toMatchSnapshot();
});
