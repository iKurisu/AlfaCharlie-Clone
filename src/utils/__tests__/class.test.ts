import { classList } from "../class";

describe("classList", (): void => {
  it("return corrent string", (): void => {
    expect(
      classList({
        a: true,
        b: false,
        c: false,
        d: true,
        ["a_b_c"]: true
      })
    ).toBe("a d a_b_c");
  });
});
