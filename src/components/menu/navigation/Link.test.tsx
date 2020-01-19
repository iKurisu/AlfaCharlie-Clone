import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";
import { mount } from "enzyme";
import Link from "./Link";

describe("navigation link", (): void => {
  const swipeSlide = jest.fn();

  const props = {
    link: "Agency",
    fadeInOrder: [1, 3, 4, 2],
    isOpen: false,
    swipeSlide
  };

  it("calls event handler", (): void => {
    const link = mount(
      <Provider store={store}>
        <Router>
          <Link {...props} />
        </Router>
      </Provider>
    );

    link
      .find(".menu-nav-link")
      .hostNodes()
      .simulate("mouseenter");

    expect(swipeSlide.mock.calls.length).toBe(1);
  });
});
