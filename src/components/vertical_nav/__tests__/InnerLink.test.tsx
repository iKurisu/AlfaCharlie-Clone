import React from "react";
import { shallow } from "enzyme";
import InnerLink from "../InnerLink";

describe("InnerLink", () => {
  it("displays the link's text correctly", () => {
    const wrapper = shallow(<InnerLink text="Click Me" show={false} />);
    expect(wrapper.find(".link-name").text()).toBe("Click Me");
  });
});
