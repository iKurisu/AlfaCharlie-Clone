import React from "react";
import { Slider } from "../Slider";
import { shallow } from "enzyme";

describe("Slider", (): void => {
  it("active slide matches prop", (): void => {
    const slider = shallow(<Slider activeSlide={2} />);
    const secondSlide = slider.childAt(1);
    const thirdSlide = slider.childAt(2);

    expect(secondSlide.hasClass("active")).toBe(false);
    expect(thirdSlide.hasClass("active")).toBe(true);
  });
});
