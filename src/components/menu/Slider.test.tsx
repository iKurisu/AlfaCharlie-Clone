import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Slider from "./Slider";

describe("slider", (): void => {
  const props = {
    isOpen: true,
    hoveringElementID: 0,
    previousElementID: 0
  };

  const { innerWidth: width } = window;

  it("renders correctly", (): void => {
    const component = renderer.create(<Slider {...props} />);
    expect(component).toMatchSnapshot();
  });

  it("has correct style", (): void => {
    const slider = shallow(<Slider {...props} />);
    const distance = (-width * 27.2) / 100;

    slider.setProps({ hoveringElementID: 1 });
    expect(slider.find(".slider-wrapper").props().style).toEqual({
      transform: `translateX(${distance.toFixed(3)}px)`,
      transition: "transform 1s"
    });

    slider.setProps({ hoveringElementID: 3, previousElementID: 1 });
    expect(slider.find(".slider-wrapper").props().style).toEqual({
      transform: `translateX(${(distance * 3).toFixed(3)}px)`,
      transition: "transform 2s"
    });
  });
});
