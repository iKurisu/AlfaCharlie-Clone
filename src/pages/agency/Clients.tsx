import React, { useRef, useEffect } from "react";
import SectionHeader from "pages/shared/SectionHeader";
import List from "./clients/List";
import useRevealSection from "hooks/useRevealSection";
import "./Clients.scss";
import useTransition from "hooks/useTransition";
import { ease } from "utils/timings";
import Mask from "components/slider/Mask";
import useParallax from "hooks/useParallax";

const Clients = (): JSX.Element => {
  const image = useRef(null);
  const section = useRef(null);
  const reveal = useRevealSection(section);

  const slideImageToRight = useTransition(image, {
    from: { transform: "translateX(-10px) scaleX(1.1)" },
    to: { transform: "translateX(0) scaleX(1)" },
    config: {
      duration: 850,
      timing: ease
    }
  });

  useEffect((): void => {
    if (reveal) slideImageToRight();
  }, [reveal]);

  const imageParallax = useRef(null);
  useParallax(imageParallax, { min: -5, max: 2 });

  const contentParallax = useRef(null);
  useParallax(contentParallax, { min: 20, max: -3.5 });

  return (
    <section className="clients" ref={section}>
      <SectionHeader text="our clients" show={reveal} />
      <div className="clients-top">
        <div className="clients-image-wrapper">
          <div className="clients-image" ref={imageParallax}>
            <Mask
              isOpen={reveal}
              options={{ fadeDirection: "left", delay: 0 }}
            />
            <img
              src={
                "https://alfacharlie.b-cdn.net/wp-content/uploads/" +
                "2019/04/House-of-Blues-Skate-Deck.jpg"
              }
              ref={image}
            />
          </div>
        </div>
        <div
          className="clients-content"
          ref={contentParallax}
          style={{ transform: "translateY(20%)" }}
        >
          <h3 className="clients-title">
            Strong partnerships make bold brands.
          </h3>
          <p className="clients-text">
            We work with global companies and entrepreneurs alike, who value
            great design and long-term collaboration.
          </p>
        </div>
      </div>
      <div className="clients-bottom">
        <List />
      </div>
    </section>
  );
};

export default Clients;
