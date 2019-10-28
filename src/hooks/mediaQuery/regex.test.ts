import { type, breakpoint, orientation, value, unit } from "./regex";

describe("regular expressions", (): void => {
  const examples = {
    min: "(minWidth: 768px) and (orientation: landscape) => 1000px",
    max: "(maxWidth: 1366px) => 20vw",
    decimal: "(maxWidth: 556px) => 15.79vw"
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
    expect(examples.min.match(value)).toContain("1000");
    expect(examples.max.match(value)).toContain("20");
    expect(examples.decimal.match(value)).toContain("15.79");
  });

  it("matches return type", (): void => {
    expect(examples.min.match(unit)).toContain("px");
    expect(examples.max.match(unit)).toContain("vw");
    expect(examples.decimal.match(unit)).toContain("vw");
  });
});
