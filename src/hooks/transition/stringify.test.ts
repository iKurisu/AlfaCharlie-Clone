import stringifyProperties from "./stringify";
import { Properties, MappedProperties } from "./types";

describe("stringifyProperties", (): void => {
  it("turns an object into a string property", (): void => {
    const properties: MappedProperties = {
      transform: {
        function: "translateX",
        initialValue: 0,
        targetValue: 100,
        unit: "%"
      },
      opacity: {
        initialValue: 1,
        targetValue: 0
      }
    };

    const stringifiedProperties: Properties = {
      transform: "translateX(0%)",
      opacity: 1
    };

    const stringifiedProperties2: Properties = {
      transform: "translateX(100%)",
      opacity: 0
    };

    expect(stringifyProperties(properties, 0)).toMatchObject(
      stringifiedProperties
    );
    expect(stringifyProperties(properties, 1)).toMatchObject(
      stringifiedProperties2
    );
  });

  it("handles null values", (): void => {
    const properties: MappedProperties = {
      transform: {
        function: "translateX",
        initialValue: null,
        targetValue: 100,
        unit: "%"
      },
      opacity: {
        initialValue: 1,
        targetValue: null
      }
    };

    const stringifiedProperties: Properties = {
      opacity: 1
    };

    const stringifiedProperties2: Properties = {
      opacity: 1,
      transform: "translateX(100%)"
    };

    expect(stringifyProperties(properties, 0)).toMatchObject(
      stringifiedProperties
    );
    expect(stringifyProperties(properties, 0.5)).toMatchObject(
      stringifiedProperties
    );
    expect(stringifyProperties(properties, 1)).toMatchObject(
      stringifiedProperties2
    );
  });

  it("handles multiple values", (): void => {
    const properties: MappedProperties = {
      transform: [
        {
          function: "translateX",
          initialValue: 0,
          targetValue: 100,
          unit: "%"
        },
        {
          function: "scaleX",
          initialValue: 1,
          targetValue: 2,
          unit: null
        }
      ]
    };

    const stringifiedProperties: Properties = {
      transform: "translateX(0%) scaleX(1)"
    };

    const stringifiedProperties2: Properties = {
      transform: "translateX(100%) scaleX(2)"
    };

    expect(stringifyProperties(properties, 0)).toMatchObject(
      stringifiedProperties
    );

    expect(stringifyProperties(properties, 1)).toMatchObject(
      stringifiedProperties2
    );
  });
});
