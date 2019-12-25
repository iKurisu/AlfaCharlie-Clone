import React from "react";
import Link from "../Link";
import { shallow } from "enzyme";

describe("vertical nav link", (): void => {
  const props = {
    link: "Instagram",
    active: false,
    order: 0,
    show: false,
    delay: 0
  };

  it("has correct class", (): void => {
    const link = shallow(<Link {...props} />);

    expect(link.find(".link-wrapper").hasClass("active")).toBe(false);
    link.setProps({ active: true });
    expect(link.find(".link-wrapper").hasClass("active")).toBe(true);
  });
});
