import React, { MouseEventHandler } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AppState } from "store";
import { testimonialsActions } from "modules/testimonials";
import SectionHeader from "../home/shared/SectionHeader";
import { TestimonialsSlider } from "components/Slider";
import Slider from "./testimonials/Slider";
import SliderNav from "./SliderNav";
import "./Testimonials.scss";

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

type Props = MappedState & MappedActions;

const Testimonials = (props: Props): JSX.Element => (
  <section className="testimonials">
    <SectionHeader text="brilliant clients" />
    <div className="testimonials-slider">
      <TestimonialsSlider
        imageUrls={imageUrls}
        options={{ fadeDirection: "left", width: { image: 52, wrapper: 60 } }}
      />
    </div>
    <div className="testimonials-content">
      <span className="quotemark">“</span>
      <Slider />
      <SliderNav imageUrls={imageUrls} {...props} />
    </div>
  </section>
);

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

export default connect(
  mapState,
  mapDispatch
)(Testimonials);
