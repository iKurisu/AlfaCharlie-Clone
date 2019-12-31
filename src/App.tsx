import React, { useRef } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Logo from "components/Logo";
import Header from "components/Header";
import VerticalNav from "components/VerticalNav";
import Footer from "components/Footer";
import MenuButton from "components/MenuButton";
import Menu from "components/Menu";
import Cursor from "components/Cursor";
import Home from "pages/Home";
import Agency from "pages/Agency";
import Work from "pages/Work";
import Privacy from "pages/Privacy";
import Project from "pages/Project";
import Contact from "pages/Contact";
import useCustomScroll from "hooks/useCustomScroll";
import projects from "data/projects.json";
import { ACProject } from "data/types";
import "./styles.scss";

const App = (): JSX.Element => {
  const scrollContent = useRef(null);

  const scroll = useCustomScroll(scrollContent, {
    distance: 100,
    duration: 2000,
    curve: [0, 0, 0.1, 1]
  });

  return (
    <React.Fragment>
      <main>
        <VerticalNav show={true} />
        <div className="scroll-content-wrapper" {...scroll}>
          <div
            className="scroll-content"
            style={{ transform: "translateY(0) " }}
            ref={scrollContent}
          >
            <Logo />
            <Route exact path="/" component={Header} />
            <div className="main-content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/agency" component={Agency} />
                <Route exact path="/work" component={Work} />
                <Route exact path="/privacy-policy" component={Privacy} />
                {projects.map((project: ACProject, id: number) => (
                  <Route
                    exact
                    path={`/projects/${project.title
                      .toLowerCase()
                      .replace(/ /g, "-")}`}
                    render={() => <Project project={project} />}
                    key={id}
                  />
                ))}
                <Route exact path="/contact" component={Contact} />
                <Redirect to="/" />
              </Switch>
            </div>
          </div>
        </div>
        <Footer />
      </main>
      <Cursor />
      <MenuButton />
      <Menu />
    </React.Fragment>
  );
};

export default App;
