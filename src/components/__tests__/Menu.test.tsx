import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { Menu } from "../Menu";

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
    const menu = shallow(<Menu {...props} />);

    expect(menu.find(".menu").hasClass("hide")).toBe(true);

    menu.setProps({ isOpen: true });

    expect(menu.find(".menu").hasClass("show")).toBe(true);
  });
});
