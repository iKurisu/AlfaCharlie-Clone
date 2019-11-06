import React from "react";
import renderer from "react-test-renderer";
import Cursor from "./Cursor";

describe("cursor", (): void => {
  it("renders correctly", (): void => {
    const cursor = renderer.create(<Cursor />);

    expect(cursor).toMatchSnapshot();
  });
});
