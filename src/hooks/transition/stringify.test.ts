import stringifyProperties from "./stringify";

it("turns an object into a string property", (): void => {
  const properties = {
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

  const stringifiedProperties = {
    transform: "translateX(0%)",
    opacity: 1
  };

  const stringifiedProperties2 = {
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
