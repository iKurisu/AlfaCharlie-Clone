import React from "react";
import { shallow } from "enzyme";
import { Menu } from "../Menu";

describe("menu", (): void => {
  const props = {
    isOpen: false,
    hoveringElementID: 0,
    previousElementID: 0,
    hoverElement: jest.fn()
  };

  it("has correct class", (): void => {
    const menu = shallow(<Menu {...props} />);

    expect(menu.find(".menu").hasClass("hide")).toBe(true);

    menu.setProps({ isOpen: true });

    expect(menu.find(".menu").hasClass("show")).toBe(true);
  });
});
