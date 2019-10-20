import React from "react";
import renderer from "react-test-renderer";
import Link from "./Link";

it("renders correctly", (): void => {
  const link = renderer.create(
    <Link link="Instagram" active={false} order={0} reveal={false} />
  );

  expect(link).toMatchSnapshot();
});
