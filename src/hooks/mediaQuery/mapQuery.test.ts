import { mapQuery, mapReturn } from "./mapQuery";
import { MappedQuery, MappedReturn } from "./types";

type MappedExamples<K, T> = {
  [A in keyof K]: T;
};

describe("mapQuery", (): void => {
  const examples = {
    min: "(minWidth: 768px) and (orientation: landscape) => 20vw",
    max: "(maxWidth: 1366px) => 700px"
  };

  const mappedQueryExamples: MappedExamples<typeof examples, MappedQuery> = {
    min: {
      type: "min",
      breakpoint: 768,
      orientation: "landscape"
    },
    max: {
      type: "max",
      breakpoint: 1366,
      orientation: null
    }
  };

  const mappedReturnExamples: MappedExamples<typeof examples, MappedReturn> = {
    min: {
      value: 20,
      unit: "vw"
    },
    max: {
      value: 700,
      unit: "px"
    }
  };

  it("maps queries correctly", (): void => {
    expect(mapQuery(examples.min)).toEqual(mappedQueryExamples.min);
    expect(mapQuery(examples.max)).toEqual(mappedQueryExamples.max);
  });

  it("maps returns correctly", (): void => {
    expect(mapReturn(examples.min)).toEqual(mappedReturnExamples.min);
    expect(mapReturn(examples.max)).toEqual(mappedReturnExamples.max);
  });

  it("throws errors correctly", (): void => {
    expect((): MappedQuery => mapQuery("(minWidth: ) => 20vw")).toThrowError(
      "Invalid breakpoint value."
    );
    expect(
      (): MappedReturn =>
        mapReturn("(maxWidth: 1366px) and (orientation: landscape) => 500")
    ).toThrowError("Invalid return value.");
  });
});
