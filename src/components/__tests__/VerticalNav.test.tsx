import React from "react";
import renderer from "react-test-renderer";
import VerticalNav from "../VerticalNav";

describe("vertical nav", (): void => {
  it("renders correctly", (): void => {
    const links: [string, boolean][] = [
      ["Expertise", false],
      ["Team", true],
      ["Clients", false]
    ];
    const component = renderer.create(
      <VerticalNav links={links} show={true} />
    );

    expect(component).toMatchSnapshot();
  });
});
