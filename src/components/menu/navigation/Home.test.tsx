import React from "react";
import renderer from "react-test-renderer";
import Home from "./Home";

it("renders correctly", (): void => {
  const home = renderer.create(<Home isOpen={true} />);
  expect(home).toMatchSnapshot();
});
