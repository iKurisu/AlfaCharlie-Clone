import React, { useRef } from "react";
import useCustomScroll from "../useCustomScroll";
import { mount } from "enzyme";

describe("useCustomScroll", (): void => {
  const TestComponent = (): JSX.Element => {
    const element = useRef(null);

    const { onWheel } = useCustomScroll(element, {
      distance: 100,
      duration: 0,
      curve: [0, 0, 0.1, 1]
    });

    return (
      <div className="scroll" onWheel={onWheel}>
        <div
          className="scroll-content"
          ref={element}
          style={{ transform: "translateY(0)" }}
        />
      </div>
    );
  };

  it("updates styles when the user scrolls", (): void => {
    const wrapper = mount(<TestComponent />);

    wrapper.find(".scroll").simulate("wheel", { deltaY: 100 });

    expect(
      getComputedStyle(
        wrapper.find(".scroll-content").getDOMNode()
      ).getPropertyValue("transform")
    ).toBe("translateY(-100px)");
  });
});
