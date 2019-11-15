import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import { introActions } from "modules/intro";
import { IntroActionTypes } from "modules/intro/types";
import { HeroSlider } from "components/Slider";
import { classList } from "utils/class";
import "./Home.scss";

const imageUrls = [
  "2019/05/Lion-House-Logo.jpg",
  "2019/05/Symbiotic-Training-Center-Logo-2.jpg",
  "2019/04/Scale-San-Diego-Logo-1.jpg",
  "2019/05/GRx-Baseball-Logo-5.jpg",
  "2019/05/Crypto-Capital-Catlyst-Logo-Design.jpg"
];

interface MappedState {
  currentSlideID: number;
}

interface MappedActions {
  toggleIntro: () => IntroActionTypes;
}

type Props = MappedState & MappedActions;

const Home = ({ currentSlideID, toggleIntro }: Props): JSX.Element => {
  useEffect((): void => {
    toggleIntro();
  }, []);

  return (
    <React.Fragment>
      <div className="row">
        <section className="hero">
          <div className="hero-content">
            <div className="hero-animation">
              <h3 className="hero-title">
                We transform brands from the inside out.
              </h3>
            </div>
            <div className="hero-animation">
              <p className="hero-text">
                Anchored in simplicity, our strategic design clarifies purpose,
                inspires loyalty, and helps you stand out in the crowd.
              </p>
            </div>
            <div className="hero-animation">
              <a className="hero-link">
                <span className="link-line"></span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 157.34 51.71"
                  xmlSpace="preserve"
                >
                  <polyline points="128.65,45.62 148.36,25.91 128.47,6.02 "></polyline>
                  <line x1="8.46" y1="25.91" x2="147.73" y2="25.91"></line>
                </svg>
                <span className="link-text-wrapper">
                  <span className="link-text">View our work</span>
                </span>
              </a>
            </div>
          </div>
          <div className="hero-slider">
            <HeroSlider imageUrls={imageUrls} maskFadeDirection={"left"} />
            <div className="hero-slider-nav">
              <span className="hero-slider-progress">
                <span className="hero-slider-prefix">
                  N<span>o</span>
                </span>
                <span className="hero-slider-current">
                  {imageUrls.map((_, id) => (
                    <span style={{ top: `${id * 100}%` }} key={id}>
                      {id + 1}
                    </span>
                  ))}
                </span>
              </span>
              <div className="hero-slider-dots">
                {imageUrls.map((_, id) => (
                  <span
                    className={classList({
                      ["hero-slider-dot"]: true,
                      active: id === currentSlideID
                    })}
                    key={id}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

const mapState = ({ hero }: AppState): MappedState => ({
  currentSlideID: hero.currentSlideID
});

const mapDispatch: MappedActions = {
  toggleIntro: introActions.toggleIntro
};

export default connect(
  mapState,
  mapDispatch
)(Home);
