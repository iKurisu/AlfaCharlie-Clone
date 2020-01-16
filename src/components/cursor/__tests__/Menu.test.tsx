import React from "react";
import { mount } from "enzyme";
import { Menu } from "../Menu";
import { Cursor } from "modules/cursor/types";
import { SubscriberContext } from "../../../App";

describe("menu cursor", (): void => {
  it("has correct class", (): void => {
    const cursor = mount(
      <SubscriberContext.Provider value={jest.fn()}>
        <Menu
          menuToggled={false}
          cursor={Cursor.SCROLL}
          hoveringElementID={0}
        />
      </SubscriberContext.Provider>
    );

    expect(cursor.find(".menu-cursor").hasClass("-show")).toBe(false);

    cursor.setProps({
      children: (
        <Menu menuToggled={true} cursor={Cursor.SCROLL} hoveringElementID={0} />
      )
    });

    expect(cursor.find(".menu-cursor").hasClass("-show")).toBe(true);

    cursor.setProps({
      children: (
        <Menu
          menuToggled={false}
          cursor={Cursor.SLIDER}
          hoveringElementID={0}
        />
      )
    });

    expect(cursor.find(".menu-cursor").hasClass("-show")).toBe(true);
  });
});
