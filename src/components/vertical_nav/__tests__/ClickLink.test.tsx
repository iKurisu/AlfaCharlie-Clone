import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import ClickLink from "../ClickLink";

describe("ClickLink", () => {
  const click = jest.fn();
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ClickLink
        link="Expertise"
        click={click}
        show={false}
        isActive={false}
        options={{ order: 0 }}
      />
    );
  });

  it("calls the click handler and toggle", () => {
    expect(click.mock.calls.length).toBe(0);

    wrapper.find(".link-wrapper").simulate("click");

    expect(click.mock.calls.length).toBe(1);
  });

  it("has correct class", () => {
    expect(wrapper.find(".link-wrapper").hasClass("active")).toBe(false);

    wrapper.setProps({ isActive: true });

    expect(wrapper.find(".link-wrapper").hasClass("active")).toBe(true);
  });
});
