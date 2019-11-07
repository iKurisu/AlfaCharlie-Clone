import React from "react";
import { shallow } from "enzyme";
import Progress from "./Progress";

describe("cursor progress", (): void => {
  it("displays correct progress", (): void => {
    const cursor = shallow(<Progress progress={0.75} />);

    expect(cursor.find("circle").props().style.strokeDashoffset).toBe(50);
  });
});
