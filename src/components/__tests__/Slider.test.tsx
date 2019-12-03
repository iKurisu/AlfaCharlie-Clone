import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { Slider, Props } from "../Slider";

const imageUrls = [
  "2019/05/Alfa-Charlie-Creative-Agency-home-e1558112927714.jpg",
  "2019/05/Alfa-Charlie-Creative-Agency-about-5.jpg",
  "2019/04/Alfa-Charlie-Creative-Agency-work.jpg",
  "2019/05/Alfa-Charlie-Creative-Agency-home-2.jpg",
  "2019/05/Alfa-Charlie-Creative-Agency-contact-2.jpg"
];

describe("slider", (): void => {
  const swipeSlide = jest.fn();

  const props: Props = {
    imageUrls,
    isOpen: true,
    currentSlideID: 0,
    previousSlideID: 0,
    swipeSlide,
    options: {
      fadeDirection: "right",
      delay: 0,
      width: { wrapper: 20, image: 10 },
      maxLength: 2000
    }
  };

  it("renders correctly", (): void => {
    const component = renderer.create(<Slider {...props} />);
    expect(component).toMatchSnapshot();
  });

  it("has correct style", (): void => {
    const slider = shallow(<Slider {...props} />);

    slider.setProps({ currentSlideID: 1, duration: 1000 });
    expect(slider.find(".slider-wrapper").props().style).toEqual({
      transform: `translateX(${(-20).toFixed(3)}px)`,
      transition: "transform 1000ms"
    });

    slider.setProps({ currentSlideID: 3, duration: 2000 });
    expect(slider.find(".slider-wrapper").props().style).toEqual({
      transform: `translateX(${(-20 * 3).toFixed(3)}px)`,
      transition: "transform 2000ms"
    });
  });
});
