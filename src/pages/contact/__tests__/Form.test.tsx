import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Form from "../Form";

describe("Form", (): void => {
  let wrapper: ShallowWrapper;
  const handleInput = jest.fn();

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
    expect(wrapper.find(".contact-form-wrapper").hasClass("-active")).toBe(
      false
    );

    wrapper.setProps({ show: true });

    expect(wrapper.find(".contact-form-wrapper").hasClass("-active")).toBe(
      true
    );
  });

  it("handles input", (): void => {
    const input = wrapper.find(".form-input.-active");

    input.simulate("change");

    expect(handleInput.mock.calls.length).toBe(1);
  });
});
