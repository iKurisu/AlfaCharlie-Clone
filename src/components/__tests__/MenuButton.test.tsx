import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import { MenuButton } from "../MenuButton";

jest.useFakeTimers();

describe("menu button", (): void => {
  it("calls the event handler", (): void => {
    const toggle = jest.fn();
    const button = shallow(<MenuButton toggled={false} toggle={toggle} />);

    button.find("div").simulate("click");

    expect(toggle.mock.calls.length).toBe(1);
  });

  it("has correct class", (): void => {
    const toggle = jest.fn();
    const button = mount(<MenuButton toggled={false} toggle={toggle} />);

    expect(button.find(".menu-button").hasClass("open")).toBe(false);
    expect(button.find(".menu-button").hasClass("disabled")).toBe(false);

    button.setProps({ toggled: true });
    button.update();

    expect(button.find(".menu-button").hasClass("open")).toBe(true);
    expect(button.find(".menu-button").hasClass("disabled")).toBe(true);

    act(() => {
      jest.runAllTimers();
    });

    button.update();

    expect(button.find(".menu-button").hasClass("disabled")).toBe(false);
  });
});
