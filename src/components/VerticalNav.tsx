import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { AppState } from "store";
import RoutedLink from "./vertical_nav/RoutedLink";
import SocialLink from "./vertical_nav/SocialLink";
import ClickLink from "./vertical_nav/ClickLink";
import { workActions } from "modules/work";
import { WorkActionTypes, Filters } from "modules/work/types";
import { AgencyState } from "modules/agency/types";
import { ScrollContext } from "../App";
import "./VerticalNav.scss";

interface MappedState {
  position: AgencyState;
}

interface MappedActions {
  setFilter: (filter: Filters) => WorkActionTypes;
}

interface OwnProps {
  menu?: boolean;
  show?: boolean;
  delay?: number;
}

type Props = MappedState & MappedActions & OwnProps;

enum AgencyLinks {
  EXPERTISE = "agency/EXPERTISE",
  TEAM = "agency/TEAM",
  CLIENTS = "agency/CLIENTS"
}

enum WorkLinks {
  ALL = "work/ALL",
  BRANDING = "work/BRANDING",
  DIGITAL = "work/DIGITAL"
}

export const VerticalNav = ({
  menu,
  show,
  delay = 0,
  position,
  setFilter
}: Props): JSX.Element => {
  const [activeLink, setActiveLink] = useState<AgencyLinks | WorkLinks>(
    WorkLinks.ALL
  );

  const {
    subscriber: [subscribe, unsubscribe],
    manualScroll
  } = useContext(ScrollContext);

  const d = 50;

  const sectionPosition = {
    [AgencyLinks.CLIENTS]: position.clients - d,
    [AgencyLinks.TEAM]: position.team - d,
    [AgencyLinks.EXPERTISE]: position.expertise - d
  };

  const updateActiveLink = (scroll: number): void => {
    const keys = Object.keys(sectionPosition) as AgencyLinks[];

    const link = keys.find(key => {
      return -scroll > sectionPosition[key] - window.innerHeight;
    });

    setActiveLink(link);
  };

  useEffect((): (() => void) => {
    subscribe(updateActiveLink);

    return () => unsubscribe(updateActiveLink);
  }, [position.expertise]);

  const renderMenuLinks = (): JSX.Element => (
    <React.Fragment>
      <li key={0}>
        <SocialLink show={show} options={{ order: 0, delay }} />
      </li>
      <li key={1}>
        <RoutedLink
          to="/privacy-policy"
          link="Privacy"
          show={show}
          options={{ order: 1, delay }}
        />
      </li>
    </React.Fragment>
  );

  const renderHomeLinks = (): JSX.Element => (
    <li key={0}>
      <SocialLink show={show} />
    </li>
  );

  function click<T>(cb: (arg: T) => void) {
    return (link: AgencyLinks | WorkLinks, arg: T) => () => {
      if (activeLink === link) return;

      setActiveLink(link);
      cb(arg);
    };
  }

  const scrollTransition = {
    duration: 2000,
    timing: [0.07, 0.4, 0.07, 1]
  };

  const scrollTo = (link: AgencyLinks): (() => void) => () => {
    setActiveLink(link);
    manualScroll({ to: sectionPosition[link], ...scrollTransition });
  };

  const clickWithDispath = click((filter: Filters) => {
    setFilter(filter);
    window.scrollTo({ top: 0 });
  });

  const renderAgencyLinks = (): JSX.Element => {
    return (
      <React.Fragment>
        <li key={0}>
          <ClickLink
            link="Expertise"
            click={scrollTo(AgencyLinks.EXPERTISE)}
            show={show}
            isActive={activeLink === AgencyLinks.EXPERTISE}
            options={{ order: 0 }}
          />
        </li>
        <li key={1}>
          <ClickLink
            link="Team"
            click={scrollTo(AgencyLinks.TEAM)}
            show={show}
            isActive={activeLink === AgencyLinks.TEAM}
            options={{ order: 1 }}
          />
        </li>
        <li key={2}>
          <ClickLink
            link="Clients"
            click={scrollTo(AgencyLinks.CLIENTS)}
            show={show}
            isActive={activeLink === AgencyLinks.CLIENTS}
            options={{ order: 2 }}
          />
        </li>
      </React.Fragment>
    );
  };

  const renderWorkLinks = (): JSX.Element => (
    <React.Fragment>
      <li key={0}>
        <ClickLink
          link="All"
          click={clickWithDispath(WorkLinks.ALL, "ALL")}
          show={show}
          isActive={activeLink === WorkLinks.ALL}
          options={{ order: 0 }}
        />
      </li>
      <li key={1}>
        <ClickLink
          link="Branding"
          click={clickWithDispath(WorkLinks.BRANDING, "BRANDING")}
          show={show}
          isActive={activeLink === WorkLinks.BRANDING}
          options={{ order: 1 }}
        />
      </li>
      <li key={2}>
        <ClickLink
          link="Digital"
          click={clickWithDispath(WorkLinks.DIGITAL, "DIGITAL")}
          show={show}
          isActive={activeLink === WorkLinks.DIGITAL}
          options={{ order: 2 }}
        />
      </li>
    </React.Fragment>
  );

  const renderProjectLinks = (): JSX.Element => (
    <React.Fragment>
      <li key={0}>
        <RoutedLink to="/work" link="View all projects" show={show} />
      </li>
    </React.Fragment>
  );

  return (
    <nav className="vertical-nav">
      <ul className="vertical-nav-links">
        {menu ? (
          renderMenuLinks()
        ) : (
          <Switch>
            <Route exact path="/">
              {renderHomeLinks()}
            </Route>
            <Route exact path="/agency">
              {renderAgencyLinks()}
            </Route>
            <Route exact path="/work">
              {renderWorkLinks()}
            </Route>
            <Route path="/projects">{renderProjectLinks()}</Route>
          </Switch>
        )}
      </ul>
    </nav>
  );
};

const mapState = ({ agency }: AppState): MappedState => ({
  position: agency
});

const mapDispatch = {
  setFilter: workActions.setVisibilityFilter
};

export default connect(mapState, mapDispatch)(VerticalNav);
