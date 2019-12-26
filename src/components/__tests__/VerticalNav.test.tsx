import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { mount, ReactWrapper } from "enzyme";
import { VerticalNav } from "../VerticalNav";

describe("VerticalNav", () => {
  const setFilter = jest.fn();

  const mountAt = (route: string): ReactWrapper =>
    mount(
      <MemoryRouter initialEntries={[route]}>
        <VerticalNav setFilter={setFilter} />
      </MemoryRouter>
    );

  const expectLinksToBe = (wrapper: ReactWrapper, links: string[]): void => {
    const linkWrappers = wrapper.find(".link-wrapper");
    links.forEach((link, i) => expect(linkWrappers.at(i).text()).toBe(link));
  };

  it("renders a list of links when it's under menu", () => {
    const wrapper = mount(
      <BrowserRouter>
        <VerticalNav menu setFilter={setFilter} />
      </BrowserRouter>
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
