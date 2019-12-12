import React, { useEffect } from "react";
import { connect } from "react-redux";
import Brief from "./agency/Brief";
import Info from "./shared/Info";
import Team from "./agency/Team";
import Clients from "./agency/Clients";
import Testimonials from "./shared/Testimonials";
import { introActions } from "modules/intro";
import { IntroActionTypes } from "modules/intro/types";

interface MappedActions {
  toggleIntro: () => IntroActionTypes;
}

type Props = MappedActions;

const Agency = ({ toggleIntro }: Props): JSX.Element => {
  useEffect((): void => {
    toggleIntro();
    document.title =
      "Branding, Web Design and Graphic Design | Alpha Charlie | What We Do";
  }, []);

  return (
    <React.Fragment>
      <div className="row">
        <Brief />
      </div>
      <div className="separator" />
      <div className="row">
        <Info
          header="what we do"
          image={
            "https://alfacharlie.b-cdn.net/wp-content/uploads/" +
            "2019/06/alfa-charlie-agency.jpg"
          }
          title="Strategy-led design with a fresh approach."
          text={
            "We believe design should be meaningful. We aim to " +
            "quiet the noise through a classic, clean aesthetic that " +
            "allows your brand to emerge defined, not decorated — " +
            "strengthening the relationship between client and customer."
          }
          link={false}
          align={"left"}
        />
      </div>
      <div className="separator -big" />
      <div className="row">
        <Team />
      </div>
      <div className="separator -big" />
      <div className="row">
        <Clients />
      </div>
      <div className="separator -big" />
      <div className="row">
        <Testimonials title="what they say" />
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
)(Agency);
