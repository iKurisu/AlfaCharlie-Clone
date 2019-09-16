import React, { useRef } from "react";
import Logo from "./home/Logo";
import useTransition from "hooks/useTransition";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";

interface Props {
  isOpen: boolean;
}

const Home = ({ isOpen }: Props): JSX.Element => {
  const home = useRef(null);

  const fadeIn = useTransition(home, {
    from: { opacity: 0, transform: "rotate(45deg)" },
    to: { opacity: 1, transform: "rotate(0)" },
    config: {
      delay: 850,
      duration: 400,
      timing: [0.28, 1, 0.5, 1]
    }
  });

  const fadeOut = useTransition(home, {
    from: { opacity: 1, transform: "rotate(0)" },
    to: { opacity: 0, transform: "rotate(-45deg)" },
    config: {
      duration: 400,
      timing: [0.28, 1, 0.5, 1]
    }
  });

  useDidUpdateEffect((): void => {
    if (isOpen) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [isOpen]);

  return (
    <a
      className="menu-home-link"
      ref={home}
      style={{ opacity: 0, transform: "rotate(45deg)" }}
    >
      <Logo />
    </a>
  );
};

export default Home;
