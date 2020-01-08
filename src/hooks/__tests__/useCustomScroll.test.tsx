import React, { useRef } from "react";
import { mount, ReactWrapper } from "enzyme";
import useCustomScroll from "../useCustomScroll";
import "../../__mocks__/clientHeight";

describe("useCustomScroll", (): void => {
  const TestComponent = (): JSX.Element => {
    const element = useRef(null);
    const listener = useRef(null);

    const [scroll, subscribe] = useCustomScroll(element, {
      distance: 100,
      duration: 0,
      curve: [0, 0, 0.1, 1]
    });

    subscribe(scroll => {
      listener.current.style.transform = `translateY(${100 + scroll}px)`;
    });

    return (
      <div className="scroll" {...scroll}>
        <div
          className="scroll-content"
          ref={element}
          style={{ transform: "translateY(0)" }}
        >
          <div className="scroll-listener" ref={listener} />
        </div>
      </div>
    );
  };

  let wrapper: ReactWrapper;

  const expectTransformToBe = (selector: string) => (value: string): void =>
    expect(
      getComputedStyle(wrapper.find(selector).getDOMNode()).getPropertyValue(
        "transform"
      )
    ).toBe(value);

  const expectContentTransformToBe = expectTransformToBe(".scroll-content");
  const expectListenerTransformToBe = expectTransformToBe(".scroll-listener");

  beforeEach((): void => {
    wrapper = mount(<TestComponent />);
  });

  it("updates styles when the user scrolls", (): void => {
    expectContentTransformToBe("translateY(0)");

    wrapper.find(".scroll").simulate("wheel", { deltaY: 100 });

    expectContentTransformToBe("translateY(-100px)");
    expectListenerTransformToBe("translateY(0px)");
  });

  it("updates styles when the user touches the screen", (): void => {
    wrapper
      .find(".scroll")
      .simulate("touchStart", { touches: [{ clientY: 200 }] });
    wrapper
      .find(".scroll")
      .simulate("touchMove", { touches: [{ clientY: 190 }] });

    expectContentTransformToBe("translateY(-10px)");
    expectListenerTransformToBe("translateY(90px)");

    wrapper.find(".scroll").simulate("touchEnd");

    expectContentTransformToBe("translateY(-610px)");
    expectListenerTransformToBe("translateY(-510px)");
  });
});
