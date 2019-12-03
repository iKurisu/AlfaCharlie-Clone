import React from "react";
import renderer from "react-test-renderer";
import { Scroll } from "../Scroll";

describe("scroll cursor", (): void => {
  it("renders correcty", (): void => {
    const cursor = renderer.create(<Scroll menuToggled={true} />);

    expect(cursor).toMatchSnapshot();
  });
});
