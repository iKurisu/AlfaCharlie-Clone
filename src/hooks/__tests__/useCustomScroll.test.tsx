import React, { useRef } from "react";
import { mount, ReactWrapper } from "enzyme";
import useCustomScroll from "../useCustomScroll";
import "../../__mocks__/clientHeight";

describe("useCustomScroll", (): void => {
  const TestComponent = (): JSX.Element => {
    const element = useRef(null);
    const listener = useRef(null);

    const [scroll, subscribe, unsubscribe] = useCustomScroll(element, {
      distance: 100,
      duration: 0,
      timing: [0, 0, 0.1, 1]
    });

    const scrollContent = (scroll: number): void => {
      listener.current.style.transform = `translateY(${100 + scroll}px)`;
    };

    subscribe(scrollContent);

    const unsubscribeListener = (): void => {
      unsubscribe(scrollContent);
    };

    return (
      <div className="scroll" {...scroll} onClick={unsubscribeListener}>
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
    const scroll = wrapper.find(".scroll");

    scroll.simulate("touchStart", { touches: [{ clientY: 200 }] });
    scroll.simulate("touchMove", { touches: [{ clientY: 190 }] });

    expectContentTransformToBe("translateY(-10px)");
    expectListenerTransformToBe("translateY(90px)");

    scroll.simulate("touchEnd");

    expectContentTransformToBe("translateY(-610px)");
    expectListenerTransformToBe("translateY(-510px)");
  });

  it("unsubscribes listener", (): void => {
    const scroll = wrapper.find(".scroll");

    scroll.simulate("click");
    scroll.simulate("wheel", { deltaY: 100 });

    expectListenerTransformToBe("");
  });
});
