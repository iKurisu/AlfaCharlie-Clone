import React from "react";
import { mount } from "enzyme";
import { Scroll } from "../Scroll";
import { Cursor } from "modules/cursor/types";
import { SubscriberContext } from "../../../App";

describe("scroll cursor", (): void => {
  it("has correct class", (): void => {
    const cursor = mount(
      <SubscriberContext.Provider value={jest.fn()}>
        <Scroll menuToggled={false} cursor={Cursor.SCROLL} />
      </SubscriberContext.Provider>
    );

    expect(cursor.find(".scroll-cursor").hasClass("-show")).toBe(true);

    cursor.setProps({
      children: <Scroll menuToggled={true} cursor={Cursor.SCROLL} />
    });

    expect(cursor.find(".scroll-cursor").hasClass("-show")).toBe(false);

    cursor.setProps({
      children: <Scroll menuToggled={false} cursor={Cursor.SLIDER} />
    });

    expect(cursor.find(".scroll-cursor").hasClass("-show")).toBe(false);
  });
});
