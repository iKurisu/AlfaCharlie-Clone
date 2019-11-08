import React from "react";
import renderer from "react-test-renderer";
import Header from "../Header";

it("renders correctly", (): void => {
  const header = renderer.create(<Header />);

  expect(header).toMatchSnapshot();
});
