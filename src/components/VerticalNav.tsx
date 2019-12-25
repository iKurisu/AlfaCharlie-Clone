import React from "react";
import { Switch, Route } from "react-router-dom";
import Link from "./vertical_nav/Link";
import SocialLink from "./vertical_nav/SocialLink";
import ClickLink from "./vertical_nav/ClickLink";
import "./VerticalNav.scss";

interface NavLink {
  link: string;
  href?: string;
  click?: <T>() => T;
  active?: boolean;
}

interface NavProps {
  links?: NavLink[];
  show?: boolean;
  delay?: number;
}

const VerticalNav = ({ links, show, delay = 0 }: NavProps): JSX.Element => {
  const renderLinks = (): JSX.Element[] =>
    links.map(
      (link, id): JSX.Element => (
        <li key={id}>
          <Link link={link} show={show} options={{ delay, order: id }} />
        </li>
      )
    );

  const homeLinks = (
    <li key={0}>
      <SocialLink link="Intagram" show={show} />
    </li>
  );

  const agencyLinks = (
    <React.Fragment>
      <li key={0}>
        <ClickLink
          link="Expertise"
          click={toggle => () => {
            toggle();
            window.scrollTo({ top: window.innerHeight });
          }}
          show={show}
          options={{ order: 0 }}
        />
      </li>
    </React.Fragment>
  );

  return (
    <nav className="vertical-nav">
      <ul className="vertical-nav-links">
        {links ? (
          renderLinks()
        ) : (
          <Switch>
            <Route exact path="/">
              {homeLinks}
            </Route>
            <Route exact path="/agency">
              {agencyLinks}
            </Route>
          </Switch>
        )}
      </ul>
    </nav>
  );
};

export default VerticalNav;
