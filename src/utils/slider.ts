interface SlideID {
  current: number;
  previous: number;
}

export const getDistance = (x: number, y: number): number => Math.abs(x - y);

export const getDuration = (
  { current, previous }: SlideID,
  maxMs: number
): number => {
  const distance = getDistance(current, previous);
  const duration = distance * 1000;

  return duration > maxMs ? 2000 : duration;
};
