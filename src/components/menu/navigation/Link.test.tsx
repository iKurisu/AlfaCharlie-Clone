import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
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
    const component = renderer.create(<Link {...props} />);

    expect(component).toMatchSnapshot();
  });

  it("calls event handler", (): void => {
    const link = shallow(<Link {...props} />);

    link.find(".menu-nav-link").simulate("mouseenter");

    expect(swipeSlide.mock.calls.length).toBe(1);
  });
});
