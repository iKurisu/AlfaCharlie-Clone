import React from "react";
import { mount } from "enzyme";
import Footer from "components/Footer";
import { MemoryRouter, Route } from "react-router-dom";
import { ScrollContext } from "../../App";
import { Provider } from "react-redux";
import store from "store";

describe("Footer", (): void => {
  const contextValues = {
    subscriber: [jest.fn(), jest.fn()],
    manualScroll: jest.fn()
  };

  it("links to contact when currentProject is not passed", (): void => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <ScrollContext.Provider value={contextValues}>
            <Footer />
          </ScrollContext.Provider>
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find("h3").text()).toBe("Let’s work together.");
  });

  it("links to next project when currentProject is passed", (): void => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/projects/symbiotic-training-center" }]}
        >
          <ScrollContext.Provider value={contextValues}>
            <Route path="/projects/:project/" component={Footer} />
          </ScrollContext.Provider>
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find("h3").text()).toBe("Lion House");
  });
});
