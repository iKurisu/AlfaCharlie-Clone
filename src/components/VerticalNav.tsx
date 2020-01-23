import React from "react";
import { Switch, Route } from "react-router-dom";
import HomeLinks from "./vertical_nav/HomeLinks";
import MenuLinks from "./vertical_nav/MenuLinks";
import AgencyLinks from "./vertical_nav/AgencyLinks";
import WorkLinks from "./vertical_nav/WorkLinks";
import ProjectLinks from "./vertical_nav/ProjectLinks";
import "./VerticalNav.scss";

interface Props {
  menu?: boolean;
  show?: boolean;
  delay?: number;
}

export const VerticalNav = ({ menu, show, delay = 0 }: Props): JSX.Element => {
  return (
    <nav className="vertical-nav">
      <ul className="vertical-nav-links">
        {menu ? (
          <MenuLinks show={show} delay={delay} />
        ) : (
          <Switch>
            <Route exact path="/" render={() => <HomeLinks show={show} />} />
            <Route
              exact
              path="/agency"
              render={() => <AgencyLinks show={show} />}
            />
            <Route
              exact
              path="/work"
              render={() => <WorkLinks show={show} />}
            />
            <Route
              path="/projects"
              render={() => <ProjectLinks show={show} />}
            />
          </Switch>
        )}
      </ul>
    </nav>
  );
};

export default VerticalNav;
