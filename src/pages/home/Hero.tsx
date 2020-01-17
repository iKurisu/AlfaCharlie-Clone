import React, { useState, useEffect, useRef, MouseEventHandler } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AppState } from "store";
import { heroActions } from "modules/hero";
import { HeroSlider } from "components/Slider";
import SliderNav from "../shared/SliderNav";
import Arrows from "../shared/Arrows";
import Symbol from "components/Symbol";
import Link from "../shared/Link";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import useTransition from "hooks/useTransition";
import useMediaQuery from "hooks/useMediaQuery";
import { getDuration } from "utils/slider";
import "./Hero.scss";

const imageUrls = [
  "2019/05/Lion-House-Logo.jpg",
  "2019/05/Symbiotic-Training-Center-Logo-2.jpg",
  "2019/04/Scale-San-Diego-Logo-1.jpg",
  "2019/05/GRx-Baseball-Logo-5.jpg",
  "2019/05/Crypto-Capital-Catlyst-Logo-Design.jpg"
];

interface MappedState {
  currentSlideID: number;
  previousSlideID: number;
}

interface MappedActions {
  swipeSlide: (slideID: number, delay: number) => MouseEventHandler;
}

export type Props = MappedState & MappedActions;

export const Hero = ({
  currentSlideID,
  previousSlideID,
  swipeSlide
}: Props): JSX.Element => {
  const [symbolRotation, rotateSymbol] = useState(0);

  useDidUpdateEffect((): void => {
    rotateSymbol(
      prevRotation =>
        prevRotation + (currentSlideID > previousSlideID ? -90 : 90)
    );
  }, [currentSlideID]);

  const title = useRef(null);
  const text = useRef(null);
  const link = useRef(null);

  const fadeIn = (
    ref: React.RefObject<HTMLDivElement>,
    delay: number = 0
  ): (() => Promise<void>) =>
    useTransition(ref, {
      from: { transform: `translateX(40px)`, opacity: 0 },
      to: { transform: `translateX(0)`, opacity: 1 },
      config: {
        duration: 450,
        timing: [0.17, 0.5, 0.48, 1],
        delay
      }
    });

  const fadeInTitle = fadeIn(title);
  const fadeInText = fadeIn(text, 250);
  const fadeInLink = fadeIn(link, 400);

  const fadeInContent = (): void => {
    fadeInTitle();
    fadeInText();
    fadeInLink();
  };

  useEffect((): void => {
    fadeInContent();
  }, []);

  const wrapperWidth = useMediaQuery([
    "(maxWidth: 480px) => 86.53vw",
    "(maxWidth: 823px) and (orientation: landscape) => 79.06vw",
    "(maxWidth: 768px) => 79.06vw",
    "(maxWidth: 1024px) => 55.33vw",
    "(maxWidth: 1600px) => 55.3vw",
    "(minWidth: 1601px) => 51.35vw"
  ]);

  const imageWidth = useMediaQuery([
    "(maxWidth: 480px) => 73.5vw",
    "(maxWidth: 823px) and (orientation: landscape) => 67.15vw",
    "(maxWidth: 768px) => 67.17vw",
    "(maxWidth: 1024px) => 47.02vw",
    "(maxWidth: 1366px) => 47.07vw",
    "(maxWidth: 1600px) => 47.11vw",
    "(minWidth: 1601px) => 46.99vw"
  ]);

  return (
    <section className="hero">
      <div className="hero-content">
        <div
          className="hero-animation"
          ref={title}
          style={{ transform: "translateX(40px)", opacity: 0 }}
        >
          <h3 className="hero-title">
            We transform brands from the inside out.
          </h3>
        </div>
        <div
          className="hero-animation"
          ref={text}
          style={{ transform: "translateX(40px)", opacity: 0 }}
        >
          <p className="hero-text">
            Anchored in simplicity, our strategic design clarifies purpose,
            inspires loyalty, and helps you stand out in the crowd.
          </p>
        </div>
        <div
          className="hero-animation"
          ref={link}
          style={{ transform: "translateX(40px)", opacity: 0 }}
        >
          <Link content="View our work" to="/work" />
        </div>
      </div>
      <div className="hero-slider">
        <HeroSlider
          imageUrls={imageUrls}
          options={{
            fadeDirection: "left",
            width: { wrapper: wrapperWidth, image: imageWidth }
          }}
        />
        <SliderNav
          slides={imageUrls}
          currentSlideID={currentSlideID}
          swipeSlide={swipeSlide}
        />
        <Arrows
          currentSlideID={currentSlideID}
          maxSwipes={imageUrls.length - 1}
          swipeSlide={swipeSlide}
        />
        <div
          className="hero-symbol"
          style={{
            transform: `rotate(${symbolRotation}deg)`,
            transition: `transform ${getDuration({
              from: previousSlideID,
              to: currentSlideID
            })}ms`
          }}
        >
          <Symbol />
        </div>
      </div>
    </section>
  );
};

const mapState = ({ hero }: AppState): MappedState => ({ ...hero });

const mapDispatch = (dispatch: Dispatch): MappedActions => ({
  swipeSlide: (slideID: number, delay: number): MouseEventHandler => () => {
    dispatch(heroActions.setSlide(slideID));
    setTimeout(() => dispatch(heroActions.updatePreviousSlide()), delay);
  }
});

export default connect(mapState, mapDispatch)(Hero);
