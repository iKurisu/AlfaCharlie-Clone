import { isValidEmail } from "../string";

describe("string utils", (): void => {
  it("'isValidEmail' determines whether a string is a valid email", (): void => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("abcd")).toBe(false);
    expect(isValidEmail("some.words")).toBe(false);
    expect(isValidEmail("test.this@string")).toBe(false);
    expect(isValidEmail("random@email.com")).toBe(true);
    expect(isValidEmail("another.random_90@email.com")).toBe(true);
  });
});
