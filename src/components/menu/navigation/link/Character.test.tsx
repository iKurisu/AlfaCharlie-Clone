import React from "react";
import renderer from "react-test-renderer";
import Character from "./Character";

it("renders correctly", (): void => {
  const char = renderer.create(
    <Character char={"d"} order={1} isOpen={true} />
  );
  expect(char).toMatchSnapshot();
});
