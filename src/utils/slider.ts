interface Options {
  from: number;
  to: number;
  max?: number;
}

export const getDistance = (x: number, y: number): number => Math.abs(x - y);

export const getDuration = ({ from, to, max = 3000 }: Options): number => {
  const distance = getDistance(from, to);
  const duration = distance * 1000;

  return duration > max ? max : duration;
};
