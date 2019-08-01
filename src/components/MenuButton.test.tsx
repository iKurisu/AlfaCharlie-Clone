import React, { useState } from "react";
import renderer from "react-test-renderer";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MenuButton from "./MenuButton";

Enzyme.configure({ adapter: new Adapter() });

describe("menu button", (): void => {
  it("renders correctly", (): void => {
    const toggle = jest.fn();
    const button = renderer.create(
      <MenuButton menuIsOpen={false} toggle={toggle} />
    );

    expect(button).toMatchSnapshot();

    const button2 = renderer.create(
      <MenuButton menuIsOpen={true} toggle={toggle} />
    );

    expect(button2).toMatchSnapshot();
  });

  it("calls the event handler", (): void => {
    const toggle = jest.fn();
    const button = shallow(<MenuButton menuIsOpen={false} toggle={toggle} />);

    button.find("div").simulate("click");

    expect(toggle.mock.calls.length).toBe(1);
  });

  it("updates the class", (): void => {
    const Wrapper = (): JSX.Element => {
      const [menuIsOpen, openMenu] = useState<boolean>(false);

      const toggleMenu = (): void => openMenu(!menuIsOpen);

      return <MenuButton menuIsOpen={menuIsOpen} toggle={toggleMenu} />;
    };

    const wrapper = mount(<Wrapper />);
    wrapper.find(".menu-button").simulate("click");

    expect(wrapper.find(".menu-button open")).toBeTruthy();
  });
});
