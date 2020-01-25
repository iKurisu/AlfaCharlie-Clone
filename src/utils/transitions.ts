export const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1 }
};

export const fadeOut = {
  from: { opacity: 1 },
  to: { opacity: 0 }
};

export const slideFromLeft = {
  from: { transform: "translateX(-100%)" },
  to: { transform: "translateX(0)" }
};

export const slideFromTop = {
  from: { transform: "translateY(-100%)" },
  to: { transform: "translateY(0)" }
};

export const slideFromBottom = {
  from: { transform: "translateY(100%)" },
  to: { transform: "translateY(0)" }
};

export const slideToRight = {
  from: { transform: "translateX(0)" },
  to: { transform: "translateX(100%)" }
};

export const slideToTop = {
  from: { transform: "translateY(0)" },
  to: { transform: "translateY(-100%)" }
};
