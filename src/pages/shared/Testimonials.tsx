import React, { MouseEventHandler, useRef } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AppState } from "store";
import { testimonialsActions } from "modules/testimonials";
import SectionHeader from "./SectionHeader";
import { TestimonialsSlider } from "components/Slider";
import Slider from "./testimonials/Slider";
import Arrows from "./Arrows";
import SliderNav from "./SliderNav";
import useMediaQuery from "hooks/useMediaQuery";
import "./Testimonials.scss";
import useRevealSection from "hooks/useRevealSection";
import useParallax from "hooks/useParallax";

const imageUrls = [
  "2019/04/classic-journeys-editorial-2.jpg",
  "2019/04/VendiBean-Machine-Design-2.jpg",
  "2019/04/kristina-kay-photography-logo-design.jpg",
  "2019/04/ChamberlaynePR-Design-3.jpg",
  "2019/04/GRx-Baseball-Logo-4.jpg"
];

interface MappedState {
  currentSlideID: number;
}

interface MappedActions {
  swipeSlide: (slideID: number, delay: number) => MouseEventHandler;
}

interface OwnProps {
  title: string;
}

type Props = MappedState & MappedActions & OwnProps;

const Testimonials = (props: Props): JSX.Element => {
  const section = useRef(null);
  const revealSection = useRevealSection(section);

  const wrapperWidth = useMediaQuery([
    "(maxWidth: 420px) => 85.61vw",
    "(maxWidth: 823px) and (orientatin: landscape) => 79.01vw",
    "(maxWidth: 768px) => 79.01vw",
    "(maxWidth: 1366px) => 37.5vw",
    "(maxWidth: 1600px) => 37.55vw",
    "(minWidth: 1601px) => 37.5vw"
  ]);

  const imageWidth = useMediaQuery([
    "(maxWidth: 420px) => 72.66vw",
    "(maxWidth: 823px) and (orientation: landscape) => 67.22vw",
    "(maxWidth: 768px) => 67.22vw",
    "(maxWidth: 1600px) => 31.93vw",
    "(minWidth: 1601px) => 31.90vw"
  ]);

  const testimonialsParallax = useRef(null);
  useParallax(testimonialsParallax, { min: -5, max: 3 });

  return (
    <section className="testimonials" ref={section}>
      <SectionHeader text={props.title} show={revealSection} />
      <div className="testimonials-image-wrapper">
        <div className="testimonials-slider" ref={testimonialsParallax}>
          <TestimonialsSlider
            show={revealSection}
            imageUrls={imageUrls}
            options={{
              fadeDirection: "left",
              width: { image: imageWidth, wrapper: wrapperWidth }
            }}
          />
        </div>
        <SliderNav slides={imageUrls} {...props} />
        <Arrows maxSwipes={imageUrls.length - 1} {...props} />
      </div>
      <div className="testimonials-content">
        <span className="quotemark">“</span>
        <Slider />
      </div>
    </section>
  );
};

const mapState = ({ testimonials }: AppState): MappedState => ({
  currentSlideID: testimonials.currentSlideID
});

const mapDispatch = (dispatch: Dispatch): MappedActions => ({
  swipeSlide: (slideID: number, delay: number): MouseEventHandler => () => {
    dispatch(testimonialsActions.setSlide(slideID));
    setTimeout(
      () => dispatch(testimonialsActions.updatePreviousSlide()),
      delay
    );
  }
});

export default connect(mapState, mapDispatch)(Testimonials);
