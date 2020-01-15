import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import Link from "./Link";

describe("navigation link", (): void => {
  const swipeSlide = jest.fn();

  const props = {
    link: "Agency",
    fadeInOrder: [1, 3, 4, 2],
    isOpen: false,
    swipeSlide
  };

  it("renders correctly", (): void => {
    const component = renderer.create(
      <Router>
        <Link {...props} />
      </Router>
    );

    expect(component).toMatchSnapshot();
  });

  it("calls event handler", (): void => {
    const link = mount(
      <Router>
        <Link {...props} />
      </Router>
    );

    link
      .find(".menu-nav-link")
      .hostNodes()
      .simulate("mouseenter");

    expect(swipeSlide.mock.calls.length).toBe(1);
  });
});
