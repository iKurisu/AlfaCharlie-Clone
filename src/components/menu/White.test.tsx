import React from "react";
import renderer from "react-test-renderer";
import White from "./White";

it("renders correctly", (): void => {
  const background = renderer.create(<White isOpen={true} />);

  expect(background).toMatchSnapshot();
});
