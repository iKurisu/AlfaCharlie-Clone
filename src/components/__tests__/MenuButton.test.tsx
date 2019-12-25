import React from "react";
import { shallow } from "enzyme";
import { MenuButton } from "../MenuButton";

describe("menu button", (): void => {
  it("calls the event handler", (): void => {
    const toggle = jest.fn();
    const button = shallow(<MenuButton toggled={false} toggle={toggle} />);

    button.find("div").simulate("click");

    expect(toggle.mock.calls.length).toBe(1);
  });

  it("has correct class", (): void => {
    const toggle = jest.fn();
    const button = shallow(<MenuButton toggled={false} toggle={toggle} />);

    expect(button.find(".menu-button").hasClass("open")).toBe(false);

    button.setProps({ toggled: true });

    expect(button.find(".menu-button").hasClass("open")).toBe(true);
  });
});
