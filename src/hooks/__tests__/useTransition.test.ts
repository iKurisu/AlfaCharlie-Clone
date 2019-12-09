import { getProgress, toFrames } from "../transition/utils";

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

it("returns the correct amount of frames", (): void => {
  expect(toFrames(400)).toBe(24);
  expect(toFrames(500)).toBe(30);
});

it("returns the correct time", (): void => {
  expect(getProgress(0, toFrames(400))).toBe(0);
  expect(getProgress(12, toFrames(400))).toBe(0.5);
  expect(getProgress(24, toFrames(400))).toBe(1);
  expect(getProgress(45, toFrames(1000))).toBe(0.75);
});
