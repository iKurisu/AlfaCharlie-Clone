import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import store from "store";
import { mount } from "enzyme";
import { Navigation } from "../Navigation";
import { Provider } from "react-redux";

describe("menu navigation", (): void => {
  it("calls event handler", (): void => {
    const mockFn = jest.fn();
    const hoverElement = (id: number) => () => mockFn(id);

    const component = mount(
      <Provider store={store}>
        <Router>
          <Navigation
            isOpen={false}
            currentSlideID={0}
            swipeSlide={hoverElement}
          />
        </Router>
      </Provider>
    );

    expect(mockFn.mock.calls.length).toBe(0);

    component.find(".menu-nav-links").simulate("mouseleave");

    expect(mockFn.mock.calls.length).toBe(1);
    expect(mockFn.mock.calls[0][0]).toBe(0);
  });
});
