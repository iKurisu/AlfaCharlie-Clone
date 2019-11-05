import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { Menu } from "./Menu";

describe("menu", (): void => {
  const props = {
    isOpen: false,
    hoveringElementID: 0,
    previousElementID: 0,
    hoverElement: jest.fn()
  };

  it("renders correctly", (): void => {
    const menu = renderer.create(<Menu {...props} />);

    expect(menu).toMatchSnapshot();
  });

  it("has correct class", (): void => {
    const hiddenMenu = shallow(<Menu {...props} />);
    const visibleMenu = shallow(<Menu {...{ ...props, isOpen: true }} />);

    expect(hiddenMenu.find(".menu").hasClass("hide")).toBe(true);
    expect(visibleMenu.find(".menu").hasClass("show")).toBe(true);
  });
});
