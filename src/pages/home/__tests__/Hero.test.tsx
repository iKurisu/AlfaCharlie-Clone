import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Hero, Props } from "../Hero";

describe("hero", (): void => {
  let hero: ShallowWrapper;

  const toggleIntro = jest.fn();
  const swipeSlide = jest.fn();

  const props: Props = {
    currentSlideID: 0,
    previousSlideID: 0,
    toggleIntro,
    swipeSlide: (id: number, delay: number) => swipeSlide.bind(null, id, delay)
  };

  beforeEach((): void => {
    hero = shallow(<Hero {...props} />);
  });

  afterEach((): void => {
    jest.clearAllMocks();
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
