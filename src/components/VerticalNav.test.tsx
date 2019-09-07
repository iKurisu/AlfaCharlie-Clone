import React from "react";
import renderer from "react-test-renderer";
import VerticalNav from "./VerticalNav";

it("renders correctly", (): void => {
  const links: string[] = ["Expertise", "Team", "Clients"];
  const component = renderer.create(<VerticalNav links={links} />);

  expect(component).toMatchSnapshot();
});
