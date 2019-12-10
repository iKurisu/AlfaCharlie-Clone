import mapProperties from "../mapProperties";
import { MappedProperties } from "../types";

describe("mapProperties", (): void => {
  it("maps properties into an object", (): void => {
    const { from, to } = {
      from: { transform: "translateX(50%)", opacity: 1 },
      to: { transform: "translateX(0%)", opacity: 0 }
    };

    const mappedProps: MappedProperties = {
      transform: [
        {
          function: "translateX",
          initialValue: 50,
          targetValue: 0,
          unit: "%"
        }
      ],
      opacity: {
        initialValue: 1,
        targetValue: 0
      }
    };

    expect(mapProperties(from, to)).toMatchObject(mappedProps);
  });

  it("handles missing target value correctly", (): void => {
    const { from, to } = {
      from: { transform: "translateX(100%)", opacity: 1 },
      to: { transform: "translateX(0)" }
    };

    const mappedProps: MappedProperties = {
      transform: [
        {
          function: "translateX",
          initialValue: 100,
          targetValue: 0,
          unit: "%"
        }
      ],
      opacity: {
        initialValue: 1,
        targetValue: null
      }
    };

    expect(mapProperties(from, to)).toMatchObject(mappedProps);
  });

  it("handles missing initial value correctly", (): void => {
    const { from, to } = {
      from: { opacity: 1 },
      to: { opacity: 0, transform: "translateX(100%)" }
    };

    const mappedProps: MappedProperties = {
      transform: [
        {
          function: "translateX",
          initialValue: null,
          targetValue: 100,
          unit: "%"
        }
      ],
      opacity: {
        initialValue: 1,
        targetValue: 0
      }
    };

    expect(mapProperties(from, to)).toMatchObject(mappedProps);
  });

  it("handles negative numbers", (): void => {
    const { from, to } = {
      from: { transform: "translateX(-100%)" },
      to: { transform: "translateX(0)" }
    };

    const mappedProps: MappedProperties = {
      transform: [
        {
          function: "translateX",
          initialValue: -100,
          targetValue: 0,
          unit: "%"
        }
      ]
    };

    expect(mapProperties(from, to)).toMatchObject(mappedProps);
  });

  it("handles initial value without unit", (): void => {
    const { from, to } = {
      from: { transform: "translateX(0)" },
      to: { transform: "translateX(50%)" }
    };

    const mappedProps: MappedProperties = {
      transform: [
        {
          function: "translateX",
          initialValue: 0,
          targetValue: 50,
          unit: "%"
        }
      ]
    };

    expect(mapProperties(from, to)).toMatchObject(mappedProps);
  });

  it("handles properties with multiple values", (): void => {
    const { from, to } = {
      from: { transform: "translateX(0) scaleX(1)" },
      to: { transform: "translateX(100%) scaleX(2)" }
    };

    const mappedProps: MappedProperties = {
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
          targetValue: 2
        }
      ]
    };

    expect(mapProperties(from, to)).toMatchObject(mappedProps);
  });

  it("handles functionless properties, such as width, top...", (): void => {
    const from = { width: "256px", top: "5%" };
    const to = { width: "100px", top: "10%" };

    const mappedProps: MappedProperties = {
      width: {
        initialValue: 256,
        targetValue: 100,
        unit: "px"
      },
      top: {
        initialValue: 5,
        targetValue: 10,
        unit: "%"
      }
    };

    expect(mapProperties(from, to)).toMatchObject(mappedProps);
  });
});
