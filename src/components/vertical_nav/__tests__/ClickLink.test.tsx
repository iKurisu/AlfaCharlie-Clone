import React from "react";
import { shallow } from "enzyme";
import ClickLink from "../ClickLink";

describe("ClickLink", (): void => {
  const click = jest.fn();
  const handler = jest.fn(() => click);

  it("calls the click handler and toggle", (): void => {
    const link = shallow(
      <ClickLink
        link="Expertise"
        click={handler}
        show={false}
        options={{ order: 0 }}
      />
    );

    expect(handler.mock.calls.length).toBe(1);
    expect(click.mock.calls.length).toBe(0);
    link.find(".link-wrapper").simulate("click");

    expect(click.mock.calls.length).toBe(1);
  });
});
