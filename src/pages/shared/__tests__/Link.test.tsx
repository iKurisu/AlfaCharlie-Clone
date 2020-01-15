import React from "react";
import { shallow } from "enzyme";
import Link from "../Link";

describe("Link", (): void => {
  it("renders correct span when a string is passed", (): void => {
    const link = shallow(<Link content="" to="/" />);
    expect(link).toMatchSnapshot();
  });

  it("renders correct spans when an author is passed", (): void => {
    const author = { name: "", position: "" };
    const link = shallow(<Link content={author} to="https:..." />);
    expect(link).toMatchSnapshot();
  });
});
