import React from "react";
import renderer from "react-test-renderer";
import Link from "./Link";

it("renders correctly", (): void => {
  const component = renderer.create(<Link link="Agency" />);

  expect(component).toMatchSnapshot();
});
