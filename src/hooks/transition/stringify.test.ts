import stringifyProperties from "./stringify";
import { Properties, MappedProperties } from "./types";

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
