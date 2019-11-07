import React from "react";
import { shallow } from "enzyme";
import Cursor from "./Cursor";

describe("cursor", (): void => {
  it("renders correctly", (): void => {
    const cursor = shallow(<Cursor />);

    expect(cursor.find("div").hasClass("cursor")).toBe(true);
  });
});
