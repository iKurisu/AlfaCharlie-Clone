import React from "react";
import renderer from "react-test-renderer";
import Link from "./Link";

it("renders correctly", (): void => {
  const update = jest.fn();

  const component = renderer.create(
    <Link
      link="Agency"
      fadeInOrder={[1, 3, 4, 2]}
      isOpen={false}
      updateHoveringElementId={update}
    />
  );

  expect(component).toMatchSnapshot();
});
