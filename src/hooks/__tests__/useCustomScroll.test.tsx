import React, { useRef } from "react";
import useCustomScroll from "../useCustomScroll";
import { mount, ReactWrapper } from "enzyme";

describe("useCustomScroll", (): void => {
  const TestComponent = (): JSX.Element => {
    const element = useRef(null);

    const scroll = useCustomScroll(element, {
      distance: 100,
      duration: 0,
      curve: [0, 0, 0.1, 1]
    });

    return (
      <div className="scroll" {...scroll}>
        <div
          className="scroll-content"
          ref={element}
          style={{ transform: "translateY(0)" }}
        />
      </div>
    );
  };

  let wrapper: ReactWrapper;

  const expectTransformToBe = (value: string): void =>
    expect(
      getComputedStyle(
        wrapper.find(".scroll-content").getDOMNode()
      ).getPropertyValue("transform")
    ).toBe(value);

  beforeEach((): void => {
    wrapper = mount(<TestComponent />);
  });

  it("updates styles when the user scrolls", (): void => {
    wrapper.find(".scroll").simulate("wheel", { deltaY: 100 });

    expectTransformToBe("translateY(-100px)");
  });

  it("updates styles when the user touches the screen", (): void => {
    wrapper
      .find(".scroll")
      .simulate("touchStart", { touches: [{ clientY: 200 }] });
    wrapper
      .find(".scroll")
      .simulate("touchMove", { touches: [{ clientY: 100 }] });

    expectTransformToBe("translateY(-100px)");

    wrapper.find(".scroll").simulate("touchEnd");

    expectTransformToBe("translateY(-10100px)");
  });
});
