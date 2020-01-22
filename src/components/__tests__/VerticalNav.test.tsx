import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import store from "store";
import { VerticalNav } from "../VerticalNav";
import { ScrollContext } from "../../App";

describe("VerticalNav", () => {
  const setFilter = jest.fn();
  const position = {
    expertise: 0,
    team: 1000,
    clients: 2000
  };

  const mountAt = (route: string): ReactWrapper =>
    mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <ScrollContext.Provider value={{ manualScroll: jest.fn() }}>
            <VerticalNav position={position} setFilter={setFilter} />
          </ScrollContext.Provider>
        </MemoryRouter>
      </Provider>
    );

  const expectLinksToBe = (wrapper: ReactWrapper, links: string[]): void => {
    const linkWrappers = wrapper.find(".link-wrapper");
    links.forEach((link, i) => expect(linkWrappers.at(i).text()).toBe(link));
  };

  it("renders a list of links when it's under menu", () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ScrollContext.Provider value={{ manualScroll: jest.fn() }}>
            <VerticalNav menu position={position} setFilter={setFilter} />
          </ScrollContext.Provider>
        </BrowserRouter>
      </Provider>
    );

    expectLinksToBe(wrapper, ["Instagram", "Privacy"]);
  });

  it("renders a single link at '/'", () => {
    const wrapper = mountAt("/");

    expect(wrapper.find(".link-wrapper").text()).toBe("Instagram");
  });

  it("renders correct links at '/agency'", () => {
    expectLinksToBe(mountAt("/agency"), ["Expertise", "Team", "Clients"]);
  });

  it("renders correct links at '/work'", () => {
    expectLinksToBe(mountAt("/work"), ["All", "Branding", "Digital"]);
  });

  it("calls 'setFilter'", () => {
    const wrapper = mountAt("/work");

    // suppress 'Not implemented' error.
    window.scrollTo = () => {};

    wrapper
      .find(".link-wrapper")
      .at(1)
      .simulate("click");

    expect(setFilter).toHaveBeenCalledWith("BRANDING");
  });
});
