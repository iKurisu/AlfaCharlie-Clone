import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { Navigation } from "../Navigation";

describe("menu navigation", (): void => {
  it("renders correctly", (): void => {
    const component = renderer.create(
      <Router>
        <Navigation isOpen={false} currentSlideID={0} swipeSlide={jest.fn()} />
      </Router>
    );

    expect(component).toMatchSnapshot();
  });

  it("call event handler", (): void => {
    const mockFn = jest.fn();
    const hoverElement = (id: number) => () => mockFn(id);

    const component = shallow(
      <Router>
        <Navigation
          isOpen={false}
          currentSlideID={0}
          swipeSlide={hoverElement}
        />
      </Router>
    );

    expect(mockFn.mock.calls.length).toBe(0);

    component.find(".menu-nav-links").simulate("mouseleave");

    expect(mockFn.mock.calls.length).toBe(1);
    expect(mockFn.mock.calls[0][0]).toBe(0);
  });
});
