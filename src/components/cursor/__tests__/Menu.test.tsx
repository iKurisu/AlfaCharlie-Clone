import React from "react";
import { mount } from "enzyme";
import { Menu, mapSlide } from "../Menu";
import { Cursor, HoverableElement } from "modules/cursor/types";
import { SubscriberContext } from "../../../App";

describe("menu cursor", (): void => {
  it("has correct class", (): void => {
    const cursor = mount(
      <SubscriberContext.Provider value={jest.fn()}>
        <Menu menuToggled={false} currentCursor={Cursor.SCROLL} slide={0} />
      </SubscriberContext.Provider>
    );

    expect(cursor.find(".menu-cursor").hasClass("-show")).toBe(false);

    cursor.setProps({
      children: (
        <Menu menuToggled={true} currentCursor={Cursor.SCROLL} slide={0} />
      )
    });

    expect(cursor.find(".menu-cursor").hasClass("-show")).toBe(true);

    cursor.setProps({
      children: (
        <Menu menuToggled={false} currentCursor={Cursor.SLIDER} slide={0} />
      )
    });

    expect(cursor.find(".menu-cursor").hasClass("-show")).toBe(true);
  });

  it("slides are mapped correctly", (): void => {
    const slides = {
      heroSlide: 1,
      menuSlide: 2,
      testimonialSlide: 3
    };

    expect(mapSlide(null, slides)).toBe(0);
    expect(mapSlide(HoverableElement.HERO, slides)).toBe(1);
    expect(mapSlide(HoverableElement.MENU, slides)).toBe(2);
    expect(mapSlide(HoverableElement.TESTIMONIALS, slides)).toBe(3);
  });
});
