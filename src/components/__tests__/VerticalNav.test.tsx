import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import store from "store";
import { VerticalNav } from "../VerticalNav";
import { ScrollContext } from "../../App";

describe("VerticalNav", () => {
  const mountAt = (route: string): ReactWrapper =>
    mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <ScrollContext.Provider
            value={{
              subscriber: [jest.fn(), jest.fn()],
              manualScroll: jest.fn()
            }}
          >
            <VerticalNav
              introToggled={false}
              loaderToggled={false}
              menuToggled={false}
            />
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
          <ScrollContext.Provider
            value={{
              subscriber: [jest.fn(), jest.fn()],
              manualScroll: jest.fn()
            }}
          >
            <VerticalNav
              menu
              introToggled={false}
              loaderToggled={false}
              menuToggled={false}
            />
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
});
