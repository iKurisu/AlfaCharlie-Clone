import React from "react";
import { mount } from "enzyme";
import Chars from "components/Chars";

describe("chars", (): void => {
  it("splits the given text into multiple elements", (): void => {
    const text = "hello world";
    const wrapper = mount(<Chars text={text} toggled={false} />);

    expect(wrapper.find("span").length).toEqual(text.length);
  });
});
