import { useState, useEffect } from "react";
import { vwToPx } from "utils/responsive";

const useResponsiveWidth = (width: number): number => {
  const [widthPx, setWidth] = useState(vwToPx(width));

  const updateWidth = (): void => setWidth(vwToPx(width));

  useEffect((): (() => void) => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [widthPx]);

  return widthPx;
};

export default useResponsiveWidth;
