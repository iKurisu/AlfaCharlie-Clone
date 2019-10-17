import React from "react";
import renderer from "react-test-renderer";
import Navigation from "./Navigation";

it("renders correctly", (): void => {
  const fn = jest.fn((id: number): (() => void) => (): void => {
    id;
  });

  const component = renderer.create(
    <Navigation isOpen={false} updateHoveringElementId={fn} />
  );

  expect(component).toMatchSnapshot();
});
