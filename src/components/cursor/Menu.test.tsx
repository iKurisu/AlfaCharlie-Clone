import React from "react";
import renderer from "react-test-renderer";
import { Menu } from "./Menu";

describe("scroll cursor", (): void => {
  it("renders correcty", (): void => {
    const cursor = renderer.create(
      <Menu menuToggled={false} hoveringElementID={2} />
    );

    expect(cursor).toMatchSnapshot();
  });
});
