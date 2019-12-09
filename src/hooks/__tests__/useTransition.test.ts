import { getEasingTime, getTotalFrames } from "../transition/utils";

const expression = /((translate|scale|rotate)([XYZ]|3d)?|skew[XYZ]?|matrix(3d)?)(?=\()/g;

it("regex matches correct properties", (): void => {
  expect("translate(50%)".match(expression)).toContain("translate");
  expect("translateX(50%)".match(expression)).toContain("translateX");
  expect("skewY(50%)".match(expression)).toContain("skewY");
  expect("scaleZ(50%)".match(expression)).toContain("scaleZ");
  expect("rotate3d(50%)".match(expression)).toContain("rotate3d");
  expect("matrix()".match(expression)).toContain("matrix");
  expect("matrix3d()".match(expression)).toContain("matrix3d");
});

it("returns the correct time", (): void => {
  expect(getEasingTime(0, 400)).toBe(0);
  expect(getEasingTime(12, 400)).toBe(0.5);
  expect(getEasingTime(24, 400)).toBe(1);
  expect(getEasingTime(45, 1000)).toBe(0.75);
});

it("returns the correct amount of frames", (): void => {
  expect(getTotalFrames(400)).toBe(24);
  expect(getTotalFrames(500)).toBe(30);
});
