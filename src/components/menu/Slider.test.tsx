import React from "react";
import renderer from "react-test-renderer";
import Slider from "./Slider";
import { shallow } from "enzyme";

it("renders correctly", (): void => {
  const component = renderer.create(
    <Slider hoveringElementId={0} previousElementId={0} />
  );
  expect(component).toMatchSnapshot();
});

it("has correct position when navigation isnt being hovered", (): void => {
  const slider = shallow(
    <Slider hoveringElementId={0} previousElementId={0} />
  );

  expect(slider.find(".slider-wrapper").prop("style")).toMatchObject({
    transform: "translateX(0px)"
  });

  expect(
    slider
      .find(".slide-img")
      .at(3)
      .prop("style")
  ).toMatchObject({
    transform: "translateX(-1016px)"
  });
});

it("has correct position when navigation is being hovered", (): void => {
  const slider = shallow(
    <Slider hoveringElementId={3} previousElementId={2} />
  );

  expect(slider.find(".slider-wrapper").prop("style")).toMatchObject({
    transform: "translateX(-1197px)"
  });

  expect(
    slider
      .find(".slide-img")
      .at(2)
      .prop("style")
  ).toMatchObject({
    transition: "transform 1s",
    transform: "translateX(340px)"
  });
});
