export const vwToPx = (vw: number): number => (vw * window.innerWidth) / 100;

export const isLandscape = (): boolean =>
  window.innerWidth > window.innerHeight;

export const isMobile = (): boolean => {
  const { innerWidth } = window;

  return innerWidth <= 480 || (isLandscape() && innerWidth <= 823);
};
