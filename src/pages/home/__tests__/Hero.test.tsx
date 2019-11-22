import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Hero, Props } from "../Hero";

describe("hero", (): void => {
  let hero: ShallowWrapper;
  let dots: ShallowWrapper;

  const toggleIntro = jest.fn();
  const swipeSlide = jest.fn();

  const props: Props = {
    currentSlideID: 0,
    previousSlideID: 0,
    toggleIntro,
    swipeSlide: (id: number, delay: number) => swipeSlide.bind(null, id, delay)
  };

  const updateWrappers = (newProps?: {
    currentSlideID?: number;
    previousSlideID?: number;
  }): void => {
    hero = shallow(<Hero {...{ ...props, ...newProps }} />);
    dots = hero.find(".hero-slider-dots");
  };

  beforeEach((): void => {
    hero = shallow(<Hero {...props} />);
    dots = hero.find(".hero-slider-dots");
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  it("has correct active dot", (): void => {
    expect(dots.childAt(0).hasClass("active")).toBe(true);
    expect(dots.childAt(4).hasClass("active")).toBe(false);

    hero.setProps({ currentSlideID: 4 });
    updateWrappers({ currentSlideID: 4 });

    expect(dots.childAt(4).hasClass("active")).toBe(true);
    expect(dots.childAt(0).hasClass("active")).toBe(false);
  });

  it("has correct progress indicator", (): void => {
    let progress = hero.find(".hero-slider-current");

    expect(progress.childAt(0).props().style.transform).toBe("translateY(0%)");

    dots.childAt(3).simulate("mouseover");
    progress = hero.find(".hero-slider-current");

    expect(progress.childAt(0).props().style.transform).toBe(
      "translateY(-300%)"
    );

    dots.childAt(3).simulate("mouseleave");
    progress = hero.find(".hero-slider-current");

    expect(progress.childAt(0).props().style.transform).toBe("translateY(0%)");
  });

  it("fires click event on dot", (): void => {
    dots.childAt(2).simulate("click");

    expect(swipeSlide.mock.calls.length).toBe(1);
    expect(swipeSlide.mock.calls[0]).toEqual([2, 2000]);
  });

  it("disables arrows correctly", (): void => {
    let prev = hero.find(".arrow-prev");
    let next = hero.find(".arrow-next");

    expect(prev.hasClass("disabled")).toBe(true);
    expect(next.hasClass("disabled")).toBe(false);

    hero.setProps({ currentSlideID: 2 });
    prev = hero.find(".arrow-prev");
    next = hero.find(".arrow-next");

    expect(prev.hasClass("disabled")).toBe(false);
    expect(next.hasClass("disabled")).toBe(false);

    hero.setProps({ currentSlideID: 4 });
    prev = hero.find(".arrow-prev");
    next = hero.find(".arrow-next");

    expect(prev.hasClass("disabled")).toBe(false);
    expect(next.hasClass("disabled")).toBe(true);
  });

  it("fires click event on left arrow", (): void => {
    const prev = hero.find(".arrow-prev");

    prev.simulate("click");

    expect(swipeSlide.mock.calls.length).toBe(1);
    expect(swipeSlide.mock.calls[0]).toEqual([-1, 1000]);
  });

  it("fires click event on right arrow", (): void => {
    const next = hero.find(".arrow-next");

    next.simulate("click");
    expect(swipeSlide.mock.calls.length).toBe(1);
    expect(swipeSlide.mock.calls[0]).toEqual([1, 1000]);
  });
});
