import React from "react";
import { shallow } from "enzyme";
import Footer from "components/Footer";

describe("Footer", (): void => {
  it("links to contact when currentProject is not passed", (): void => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find("h3").text()).toBe("Let’s work together.");
  });

  it("links to next project when currentProject is passed", (): void => {
    const wrapper = shallow(<Footer currentProject="lion-house" />);
    expect(wrapper.find("h3").text()).toBe("Rhum Bar");

    const lastWrapper = shallow(<Footer currentProject="sorensen-elite" />);
    expect(lastWrapper.find("h3").text()).toBe("Symbiotic Training Center");
  });
});
