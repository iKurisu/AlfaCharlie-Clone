import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Arrows, { Props } from "../Arrows";

describe("hero", (): void => {
  let arrows: ShallowWrapper;
  let prev: ShallowWrapper;
  let next: ShallowWrapper;

  const swipeSlide = jest.fn();

  const props: Props = {
    currentSlideID: 0,
    maxSwipes: 4,
    swipeSlide: (id: number, delay: number) => swipeSlide.bind(null, id, delay)
  };

  beforeEach((): void => {
    arrows = shallow(<Arrows {...props} />);
    prev = arrows.find(".arrow-prev");
    next = arrows.find(".arrow-next");
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  it("disables arrows correctly", (): void => {
    expect(prev.hasClass("disabled")).toBe(true);
    expect(next.hasClass("disabled")).toBe(false);

    arrows.setProps({ currentSlideID: 2 });
    prev = arrows.find(".arrow-prev");
    next = arrows.find(".arrow-next");

    expect(prev.hasClass("disabled")).toBe(false);
    expect(next.hasClass("disabled")).toBe(false);

    arrows.setProps({ currentSlideID: 4 });
    prev = arrows.find(".arrow-prev");
    next = arrows.find(".arrow-next");

    expect(prev.hasClass("disabled")).toBe(false);
    expect(next.hasClass("disabled")).toBe(true);
  });

  it("fires click event on left arrow", (): void => {
    prev.simulate("click");

    expect(swipeSlide.mock.calls.length).toBe(1);
    expect(swipeSlide.mock.calls[0]).toEqual([-1, 1000]);
  });

  it("fires click event on right arrow", (): void => {
    next.simulate("click");

    expect(swipeSlide.mock.calls.length).toBe(1);
    expect(swipeSlide.mock.calls[0]).toEqual([1, 1000]);
  });
});
