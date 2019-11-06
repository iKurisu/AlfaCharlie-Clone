import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Navigation from "./Navigation";

describe("menu navigation", (): void => {
  it("renders correctly", (): void => {
    const component = renderer.create(
      <Navigation isOpen={false} hoverElement={jest.fn()} />
    );

    expect(component).toMatchSnapshot();
  });

  it("call event handler", (): void => {
    const mockFn = jest.fn();
    const hoverElement = (id: number) => () => mockFn(id);

    const component = shallow(
      <Navigation isOpen={false} hoverElement={hoverElement} />
    );

    expect(mockFn.mock.calls.length).toBe(0);

    component.find(".menu-nav-links").simulate("mouseleave");

    expect(mockFn.mock.calls.length).toBe(1);
    expect(mockFn.mock.calls[0][0]).toBe(0);
  });
});
