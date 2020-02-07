import { classList } from "../class";

describe("classList", (): void => {
  it("works correctly with an array of strings", (): void => {
    expect(classList(["a", "b", "a_b_c"])).toBe("a b a_b_c");
    expect(classList(["home", "active"])).toBe("home active");
  });

  it("works correctly with an object", (): void => {
    expect(classList({ active: true })).toBe("active");
    expect(classList({ hide: false })).toBe("");
    expect(classList({ active: true, hide: true })).toBe("active hide");
  });

  it("works correctly with an array of strings and objects", (): void => {
    expect(classList(["a", { show: true }])).toBe("a show");
  });
});
