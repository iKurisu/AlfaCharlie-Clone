import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import loadable from "@loadable/component";
import { AppState } from "store";
import "./VerticalNav.scss";

const HomeLinks = loadable(() => import("./vertical_nav/HomeLinks"));
const MenuLinks = loadable(() => import("./vertical_nav/MenuLinks"));
const AgencyLinks = loadable(() => import("./vertical_nav/AgencyLinks"));
const WorkLinks = loadable(() => import("./vertical_nav/WorkLinks"));
const ProjectLinks = loadable(() => import("./vertical_nav/ProjectLinks"));

interface MappedState {
  introToggled: boolean;
  loaderToggled: boolean;
  menuToggled: boolean;
}

interface OwnProps {
  menu?: boolean;
  delay?: number;
}

type Props = MappedState & OwnProps;

export const VerticalNav = ({
  introToggled,
  loaderToggled,
  menuToggled,
  menu = false,
  delay = 0
}: Props): JSX.Element => {
  return (
    <nav className="vertical-nav">
      <ul className="vertical-nav-links">
        {menu ? (
          <MenuLinks show={menuToggled} delay={delay} />
        ) : (
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <HomeLinks show={!introToggled && !loaderToggled} />
              )}
            />
            <Route
              exact
              path="/agency"
              render={() => (
                <AgencyLinks show={!introToggled && !loaderToggled} />
              )}
            />
            <Route
              exact
              path="/work"
              render={() => (
                <WorkLinks show={!introToggled && !loaderToggled} />
              )}
            />
            <Route
              path="/projects"
              render={() => (
                <ProjectLinks show={!introToggled && !loaderToggled} />
              )}
            />
          </Switch>
        )}
      </ul>
    </nav>
  );
};

const mapState = ({ intro, loader, menu }: AppState): MappedState => ({
  introToggled: intro.toggled,
  loaderToggled: loader.main,
  menuToggled: menu.toggled
});

export default connect(mapState)(VerticalNav);
