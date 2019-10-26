import mapQuery from "./mapQuery";
import { MappedQuery } from "./types";

describe("mapQuery", (): void => {
  const examples = {
    min: "(minWidth: 768px) and (orientation: landscape) => 20vw",
    max: "(maxWidth: 1366px) => 700px"
  };

  const mappedExamples: { [k in keyof typeof examples]: MappedQuery } = {
    min: {
      type: "min",
      breakpoint: 768,
      orientation: "landscape",
      value: "20vw"
    },
    max: {
      type: "max",
      breakpoint: 1366,
      orientation: null,
      value: "700px"
    }
  };

  it("maps queries correctly", (): void => {
    expect(mapQuery(examples.min)).toEqual(mappedExamples.min);
    expect(mapQuery(examples.max)).toEqual(mappedExamples.max);
  });

  it("throws errors correctly", (): void => {
    expect((): MappedQuery => mapQuery("(minWidth: ) => 20vw")).toThrowError(
      "Invalid breakpoint value."
    );
    expect(
      (): MappedQuery =>
        mapQuery("(maxWidth: 1366px) and (orientation: landscape) => 500")
    ).toThrowError("Invalid return value.");
  });
});
