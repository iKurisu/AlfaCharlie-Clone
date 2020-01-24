import { isValidEmail, capitalize, projectTitleToPath } from "../string";

describe("string utils", (): void => {
  it("'isValidEmail' determines whether a string is a valid email", (): void => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("abcd")).toBe(false);
    expect(isValidEmail("some.words")).toBe(false);
    expect(isValidEmail("test.this@string")).toBe(false);
    expect(isValidEmail("random@email.com")).toBe(true);
    expect(isValidEmail("another.random_90@email.com")).toBe(true);
  });

  it("capitalizes strings", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("wORLD")).toBe("World");
  });

  it("formats title to url", (): void => {
    expect(projectTitleToPath("Hello World")).toBe("/projects/hello-world");
    expect(projectTitleToPath("Rhum Bar")).toBe("/projects/rhum-bar");
  });
});
