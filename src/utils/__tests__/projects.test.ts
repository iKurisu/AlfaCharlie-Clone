import { findNextTitle, mapProjectParamToTitle } from "../projects";

describe("project utils", () => {
  it("maps the project param to its corresponding title", () => {
    expect(mapProjectParamToTitle("grx-baseball")).toBe("GRx Baseball");
    expect(mapProjectParamToTitle("chamberlaynepr")).toBe("ChamberlaynePR");
  });

  it("returns the next project's title", () => {
    expect(findNextTitle("symbiotic-training-center")).toBe("Lion House");
    expect(findNextTitle("sorensen-elite")).toBe("Symbiotic Training Center");
    expect(findNextTitle("grx-baseball")).toBe("Ingenious Automation");
  });
});
