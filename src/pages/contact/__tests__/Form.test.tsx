import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Form from "../Form";

describe("Form", (): void => {
  let wrapper: ShallowWrapper;
  const handleInput = jest.fn();

  const is = (className: string) => (
    selector: string,
    index: number = 0
  ): boolean =>
    wrapper
      .find(selector)
      .at(index)
      .hasClass(className);

  const isActive = is("-active");
  const isDisabled = is("-disabled");

  beforeEach((): void => {
    wrapper = shallow(
      <Form
        names={["a", "b", "c"]}
        form={{ a: "", b: "", c: "" }}
        handleInput={handleInput}
        show={false}
      />
    );
  });

  it("has correct class", (): void => {
    expect(isActive(".contact-form-wrapper")).toBe(false);

    wrapper.setProps({ show: true });

    expect(isActive(".contact-form-wrapper")).toBe(true);
  });

  it("handles input", (): void => {
    const input = wrapper.find(".form-input.-active");

    input.simulate("change");

    expect(handleInput.mock.calls.length).toBe(1);
  });

  it("shows error when next arrow is clicked and input is invalid", (): void => {
    const next = wrapper.find(".arrow-next");

    expect(isActive(".form-error")).toBe(false);

    next.simulate("click");

    expect(isActive(".form-error")).toBe(true);
  });

  it("changes slides correctly", (): void => {
    wrapper.setProps({ form: { a: "sldkf", b: "", c: "" } });

    expect(isDisabled(".arrow-prev")).toBe(true);
    expect(isActive(".form-label")).toBe(true);
    expect(isActive(".form-label", 1)).toBe(false);

    const next = wrapper.find(".arrow-next");

    next.simulate("click");

    expect(isDisabled(".arrow-prev")).toBe(false);
    expect(isActive(".form-label")).toBe(false);
    expect(isActive(".form-label", 1)).toBe(true);
  });

  it("error is hidden once the slide is changed", (): void => {
    const next = wrapper.find(".arrow-next");
    const prev = wrapper.find(".arrow-prev");

    next.simulate("click");

    wrapper.setProps({ form: { a: "dfslkfs", b: "", c: "" } });

    expect(isActive(".form-error")).toBe(true);

    next.simulate("click");

    expect(isActive(".form-error", 1)).toBe(false);

    prev.simulate("click");

    expect(isActive(".form-error")).toBe(false);
  });
});
