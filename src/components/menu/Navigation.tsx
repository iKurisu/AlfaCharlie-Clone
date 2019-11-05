import React, { useRef, MouseEventHandler } from "react";
import Home from "./navigation/Home";
import Link from "./navigation/Link";
import useTransition from "hooks/useTransition";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import "./Navigation.scss";

interface Props {
  isOpen: boolean;
  hoverElement: (elementID: number) => MouseEventHandler;
}

const Navigation = ({ isOpen, hoverElement }: Props): JSX.Element => {
  const links = ["agency", "work", "journal", "contact"];
  const fadeInOrder = [
    [1, 4, 2, 2, 1, 3],
    [2, 3, 3, 3],
    [4, 1, 3, 4, 3, 4, 2],
    [2, 2, 4, 4, 4, 2, 2]
  ];

  const nav = useRef(null);

  const fadeIn = useTransition(nav, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      delay: 800,
      duration: 900,
      timing: [0.28, 1, 0.5, 1]
    }
  });

  const fadeOut = useTransition(nav, {
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: {
      duration: 1000,
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
    <div className="menu-nav-wrapper -flex">
      <Home isOpen={isOpen} />
      <nav
        className="menu-nav-links -flex"
        onMouseLeave={hoverElement(0)}
        style={{ opacity: 0 }}
        ref={nav}
      >
        {links.map(
          (link: string, id: number): JSX.Element => (
            <Link
              link={link}
              fadeInOrder={fadeInOrder[id]}
              isOpen={isOpen}
              hoverElement={hoverElement(id + 1)}
              key={id}
            />
          )
        )}
      </nav>
    </div>
  );
};

export default Navigation;
