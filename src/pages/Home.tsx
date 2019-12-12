import React, { useEffect } from "react";
import { connect } from "react-redux";
import Hero from "./home/Hero";
import Info from "./shared/Info";
import Testimonials from "./shared/Testimonials";
import { introActions } from "modules/intro";
import { IntroActionTypes } from "modules/intro/types";
import "./Home.scss";

interface MappedActions {
  toggleIntro: () => IntroActionTypes;
}

type Props = MappedActions;

const Home = ({ toggleIntro }: Props): JSX.Element => {
  useEffect((): void => {
    toggleIntro();
  }, []);

  return (
    <React.Fragment>
      <div className="row">
        <Hero />
      </div>
      <div className="separator" />
      <div className="row">
        <Info
          header="elegant solutions"
          image={
            "https://alfacharlie.b-cdn.net/wp-content/uploads/" +
            "2019/05/Alfa-Charlie-Creative-Agency-6-1-e1558111141759.jpg"
          }
          title="Insight + creativity"
          text={
            "We’re adept at understanding what a project needs. Our " +
            "designs capture the essence of your business, so you can make " +
            "a more consistent and memorable impact, everywhere."
          }
          link={true}
        />
      </div>
      <div className="separator -big" />
      <div className="row">
        <Testimonials title="brilliant clients" />
      </div>
    </React.Fragment>
  );
};

const mapDispatch: MappedActions = {
  toggleIntro: introActions.toggleIntro
};

export default connect(
  null,
  mapDispatch
)(Home);
