import React from "react";
import { mount } from "enzyme";
import useDrag from "../useDrag";

describe("useDrag", (): void => {
  const onClick = jest.fn();
  const onDrag = jest.fn();
  const onDrop = jest.fn();

  it("fires event handlers", (): void => {
    const TestComponent = (): JSX.Element => {
      const dragProps = useDrag({
        onClick,
        onDrag,
        onDrop
      });

      return <div {...dragProps} />;
    };

    const component = mount(<TestComponent />);
    const div = component.find("div");

    div.simulate("mousedown");
    expect(onClick.mock.calls.length).toBe(1);

    div.simulate("mousemove");
    expect(onDrag.mock.calls.length).toBe(1);

    div.simulate("mouseup");
    expect(onDrop.mock.calls.length).toBe(1);
  });
});
