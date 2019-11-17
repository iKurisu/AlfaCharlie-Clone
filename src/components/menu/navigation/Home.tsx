import React, { useRef } from "react";
import Symbol from "components/Symbol";
import useTransition from "hooks/useTransition";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import "./Home.scss";

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
      duration: 800,
      timing: [0.1, 0.8, 0.35, 0.95]
    }
  });

  const fadeOut = useTransition(home, {
    from: { opacity: 1, transform: "rotate(0)" },
    to: { opacity: 0, transform: "rotate(-45deg)" },
    config: {
      duration: 800,
      timing: [0.1, 0.8, 0.35, 0.95]
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
      <Symbol />
    </a>
  );
};

export default Home;
