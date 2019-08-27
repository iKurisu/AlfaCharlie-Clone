import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Menu from "./Menu";

it("renders correctly", (): void => {
  const menu = renderer.create(<Menu isOpen={false} />);

  expect(menu).toMatchSnapshot();
});

it("has correct class", (): void => {
  const hiddenMenu = shallow(<Menu isOpen={false} />);
  const visibleMenu = shallow(<Menu isOpen={true} />);

  expect(hiddenMenu.find(".menu").hasClass("hide")).toBe(true);
  expect(visibleMenu.find(".menu").hasClass("show")).toBe(true);
});
