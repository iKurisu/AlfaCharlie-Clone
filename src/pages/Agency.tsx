import React, { useEffect, useRef, RefObject } from "react";
import { connect } from "react-redux";
import Brief from "./agency/Brief";
import Info from "./shared/Info";
import Team from "./agency/Team";
import Clients from "./agency/Clients";
import Testimonials from "./shared/Testimonials";
import FooterArt from "components/FooterArt";
import { agencyActions } from "modules/agency";

interface AgencyRefs {
  expertise: RefObject<HTMLDivElement>;
  team: RefObject<HTMLDivElement>;
  clients: RefObject<HTMLDivElement>;
}

interface MappedActions {
  calculateDistanceFromTop: (element: AgencyRefs) => void;
}

type Props = MappedActions;

const Agency = ({ calculateDistanceFromTop }: Props): JSX.Element => {
  const expertise = useRef(null);
  const team = useRef(null);
  const clients = useRef(null);

  const recalculateDistance = (): void => {
    calculateDistanceFromTop({
      expertise,
      team,
      clients
    });
  };

  useEffect((): (() => void) => {
    calculateDistanceFromTop({ expertise, team, clients });

    document.title =
      "Branding, Web Design and Graphic Design | Alpha Charlie | What We Do";

    window.addEventListener("resize", recalculateDistance);

    return () => {
      window.removeEventListener("resize", recalculateDistance);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="row">
        <Brief />
      </div>
      <div className="separator" />
      <div className="row" ref={expertise}>
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
          align={"left"}
        />
      </div>
      <div className="separator -big" />
      <div className="row" ref={team}>
        <Team />
      </div>
      <div className="separator -big" />
      <div className="row" ref={clients}>
        <Clients />
      </div>
      <div className="separator -big" />
      <div className="row">
        <Testimonials title="what they say" />
      </div>
      <FooterArt />
    </React.Fragment>
  );
};

const mapDispatch: MappedActions = {
  calculateDistanceFromTop: agencyActions.calculateDistanceFromTop
};

export default connect(null, mapDispatch)(Agency);
