import React from "react";
import renderer from "react-test-renderer";
import Gray from "../Gray";

it("renders correctly", (): void => {
  const background = renderer.create(<Gray isOpen={true} />);

  expect(background).toMatchSnapshot();
});
