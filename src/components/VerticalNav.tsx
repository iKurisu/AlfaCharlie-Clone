import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { AppState } from "store";
import HomeLinks from "./vertical_nav/HomeLinks";
import MenuLinks from "./vertical_nav/MenuLinks";
import AgencyLinks from "./vertical_nav/AgencyLinks";
import WorkLinks from "./vertical_nav/WorkLinks";
import ProjectLinks from "./vertical_nav/ProjectLinks";
import "./VerticalNav.scss";

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
