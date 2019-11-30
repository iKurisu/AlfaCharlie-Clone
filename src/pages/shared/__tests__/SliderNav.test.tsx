import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import SliderNav, { Props } from "../SliderNav";

describe("SliderNav", (): void => {
  let nav: ShallowWrapper;
  let dots: ShallowWrapper;
  let progress: ShallowWrapper;

  const swipeSlide = jest.fn();

  const props: Props = {
    imageUrls: ["", "", "", "", ""],
    currentSlideID: 0,
    swipeSlide: (id: number, delay: number) => swipeSlide.bind(null, id, delay)
  };

  beforeEach((): void => {
    nav = shallow(<SliderNav {...props} />);
    dots = nav.find(".slider-dots");
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  it("has correct active dot", (): void => {
    expect(dots.childAt(0).hasClass("active")).toBe(true);
    expect(dots.childAt(4).hasClass("active")).toBe(false);

    nav.setProps({ currentSlideID: 4 });
    dots = nav.find(".slider-dots");

    expect(dots.childAt(4).hasClass("active")).toBe(true);
    expect(dots.childAt(0).hasClass("active")).toBe(false);
  });

  it("has correct progress indicator", (): void => {
    progress = nav.find(".slider-current");
    expect(progress.childAt(0).props().style.transform).toBe("translateY(0%)");

    dots.childAt(3).simulate("mouseover");
    progress = nav.find(".slider-current");

    expect(progress.childAt(0).props().style.transform).toBe(
      "translateY(-300%)"
    );

    dots.childAt(3).simulate("mouseleave");
    progress = nav.find(".slider-current");

    expect(progress.childAt(0).props().style.transform).toBe("translateY(0%)");
  });

  it("fires click event on dot", (): void => {
    dots.childAt(2).simulate("click");

    expect(swipeSlide.mock.calls.length).toBe(1);
    expect(swipeSlide.mock.calls[0]).toEqual([2, 2000]);
  });
});
