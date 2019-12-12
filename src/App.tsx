import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Logo from "components/Logo";
import Header from "components/Header";
import VerticalNav from "components/VerticalNav";
import MenuButton from "components/MenuButton";
import Menu from "components/Menu";
import Cursor from "components/Cursor";
import Home from "pages/Home";
import Agency from "pages/Agency";
import Work from "pages/Work";
import "./styles.scss";

const App = (): JSX.Element => (
  <React.Fragment>
    <main>
      <VerticalNav
        links={[
          ["All", true],
          ["Design", false],
          ["Wellness", false],
          ["Agency", false]
        ]}
        show={true}
      />
      <div className="scroll-content-wrapper">
        <div className="scroll-content">
          <Logo />
          <Route exact path="/" component={Header} />
          <div className="main-content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/agency" component={Agency} />
              <Route exact path="/work" component={Work} />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </div>
    </main>
    <Cursor />
    <MenuButton />
    <Menu />
  </React.Fragment>
);

export default App;
