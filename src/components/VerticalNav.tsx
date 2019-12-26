import React, { useState } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import PolicyLink from "./vertical_nav/PolicyLink";
import SocialLink from "./vertical_nav/SocialLink";
import ClickLink from "./vertical_nav/ClickLink";
import { workActions } from "modules/work";
import { WorkActionTypes, Filters } from "modules/work/types";
import "./VerticalNav.scss";

interface MappedActions {
  setFilter: (filter: Filters) => WorkActionTypes;
}

interface OwnProps {
  menu?: boolean;
  show?: boolean;
  delay?: number;
}

type Props = MappedActions & OwnProps;

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

const VerticalNav = ({
  menu,
  show,
  delay = 0,
  setFilter
}: Props): JSX.Element => {
  const [activeLink, setActiveLink] = useState<AgencyLinks | WorkLinks>(
    WorkLinks.ALL
  );

  const MenuLinks = (
    <React.Fragment>
      <li key={0}>
        <SocialLink show={show} options={{ order: 0, delay }} />
      </li>
      <li key={1}>
        <PolicyLink show={show} options={{ order: 1, delay }} />
      </li>
    </React.Fragment>
  );

  const homeLinks = (
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

  const clickWithScroll = click((scroll: number) =>
    window.scrollTo({ top: scroll })
  );

  const clickWithDispath = click((filter: Filters) => {
    setFilter(filter);
    window.scrollTo({ top: 0 });
  });

  const agencyLinks = (
    <React.Fragment>
      <li key={0}>
        <ClickLink
          link="Expertise"
          click={clickWithScroll(
            AgencyLinks.EXPERTISE,
            window.innerHeight + 100
          )}
          show={show}
          isActive={activeLink === AgencyLinks.EXPERTISE}
          options={{ order: 0 }}
        />
      </li>
      <li key={1}>
        <ClickLink
          link="Team"
          click={clickWithScroll(
            AgencyLinks.TEAM,
            2 * window.innerHeight + 100
          )}
          show={show}
          isActive={activeLink === AgencyLinks.TEAM}
          options={{ order: 1 }}
        />
      </li>
      <li key={2}>
        <ClickLink
          link="Clients"
          click={clickWithScroll(
            AgencyLinks.CLIENTS,
            3 * window.innerHeight + 700
          )}
          show={show}
          isActive={activeLink === AgencyLinks.CLIENTS}
          options={{ order: 2 }}
        />
      </li>
    </React.Fragment>
  );

  const workLinks = (
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

  return (
    <nav className="vertical-nav">
      <ul className="vertical-nav-links">
        {menu ? (
          MenuLinks
        ) : (
          <Switch>
            <Route exact path="/">
              {homeLinks}
            </Route>
            <Route exact path="/agency">
              {agencyLinks}
            </Route>
            <Route exact path="/work">
              {workLinks}
            </Route>
          </Switch>
        )}
      </ul>
    </nav>
  );
};

const mapDispatch = {
  setFilter: workActions.setVisibilityFilter
};

export default connect(null, mapDispatch)(VerticalNav);
