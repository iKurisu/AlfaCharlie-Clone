import React, { useEffect, useContext, useState } from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import ClickLink from "./ClickLink";
import { ScrollContext } from "../../App";
import { AgencyState } from "modules/agency/types";

enum Links {
  EXPERTISE = "agency/EXPERTISE",
  TEAM = "agency/TEAM",
  CLIENTS = "agency/CLIENTS"
}

interface MappedState {
  position: AgencyState;
}

interface OwnProps {
  show: boolean;
}

type Props = MappedState & OwnProps;

const AgencyLinks = ({ show, position }: Props): JSX.Element => {
  const [activeLink, setActiveLink] = useState(null);

  const {
    subscriber: [subscribe, unsubscribe],
    manualScroll
  } = useContext(ScrollContext);

  const scrollTransition = {
    duration: 2000,
    timing: [0.07, 0.4, 0.07, 1]
  };

  const d = 50;
  const sectionPosition = {
    [Links.CLIENTS]: position.clients - d,
    [Links.TEAM]: position.team - d,
    [Links.EXPERTISE]: position.expertise - d
  };

  const scrollTo = (link: Links): (() => void) => () => {
    setActiveLink(link);
    manualScroll({ to: sectionPosition[link], ...scrollTransition });
  };

  const updateActiveLink = (scroll: number): void => {
    const keys = Object.keys(sectionPosition) as Links[];

    const link = keys.find(key => {
      return -scroll > sectionPosition[key] - window.innerHeight;
    });

    setActiveLink(link);
  };

  useEffect((): (() => void) => {
    subscribe(updateActiveLink);

    return () => unsubscribe(updateActiveLink);
  }, [position.expertise]);

  return (
    <React.Fragment>
      <li key={0}>
        <ClickLink
          link="Expertise"
          click={scrollTo(Links.EXPERTISE)}
          show={show}
          isActive={activeLink === Links.EXPERTISE}
          options={{ order: 0 }}
        />
      </li>
      <li key={1}>
        <ClickLink
          link="Team"
          click={scrollTo(Links.TEAM)}
          show={show}
          isActive={activeLink === Links.TEAM}
          options={{ order: 1 }}
        />
      </li>
      <li key={2}>
        <ClickLink
          link="Clients"
          click={scrollTo(Links.CLIENTS)}
          show={show}
          isActive={activeLink === Links.CLIENTS}
          options={{ order: 2 }}
        />
      </li>
    </React.Fragment>
  );
};

const mapState = ({ agency }: AppState): MappedState => ({
  position: agency
});

export default connect(mapState)(AgencyLinks);
