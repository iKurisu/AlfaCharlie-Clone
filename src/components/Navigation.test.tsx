import React from "react";
import renderer from "react-test-renderer";
import Navigation from "./Navigation";

it("renders correctly", (): void => {
  const links: string[] = ["Expertise", "Team", "Clients"];
  const component = renderer.create(<Navigation links={links} />);

  expect(component).toMatchSnapshot();
});
