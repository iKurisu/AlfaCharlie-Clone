import React from "react";
import renderer from "react-test-renderer";
import Navigation from "./Navigation";

describe("menu navigation", (): void => {
  it("renders correctly", (): void => {
    const component = renderer.create(
      <Navigation isOpen={false} hoverElement={jest.fn()} />
    );

    expect(component).toMatchSnapshot();
  });
});
