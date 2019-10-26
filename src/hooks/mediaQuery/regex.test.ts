import { type, breakpoint, orientation, value } from "./regex";

describe("regular expressions", (): void => {
  const examples = {
    min: "(minWidth: 768px) and (orientation: landscape) => 1000px",
    max: "(maxWidth: 1366px) => 20vw"
  };

  it("matches query type", (): void => {
    expect(examples.min.match(type)).toContain("min");
    expect(examples.max.match(type)).toContain("max");
  });

  it("matches breakpoints", (): void => {
    expect(examples.min.match(breakpoint)).toContain("768");
    expect(examples.max.match(breakpoint)).toContain("1366");
  });

  it("matches orientation", (): void => {
    expect(examples.min.match(orientation)).toContain("landscape");
    expect(examples.max.match(orientation)).toBe(null);
  });

  it("matches return value", (): void => {
    expect(examples.min.match(value)).toContain("1000px");
    expect(examples.max.match(value)).toContain("20vw");
  });
});
