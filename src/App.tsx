import React, { useRef, createContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import loadable from "@loadable/component";
import Logo from "components/Logo";
import Header from "components/Header";
import VerticalNav from "components/VerticalNav";
import Footer from "components/Footer";
import MenuButton from "components/MenuButton";
import Menu from "components/Menu";
import Cursor from "components/Cursor";
import ArrowButton from "components/ArrowButton";
import Intro from "components/Intro";
import Loader from "components/Loader";
import FooterLoader from "components/FooterLoader";
import Project from "pages/Project";
import useCustomScroll from "hooks/useCustomScroll";
import projects from "data/projects.json";
import { ACProject } from "data/types";
import { projectTitleToPath } from "utils/string";
import "./styles.scss";

const Home = loadable(() => import("pages/Home"));
const Agency = loadable(() => import("pages/Agency"));
const Work = loadable(() => import("pages/Work"));
const Privacy = loadable(() => import("pages/Privacy"));
const Contact = loadable(() => import("pages/Contact"));

export const ScrollContext = createContext(null);

const App = (): JSX.Element => {
  const scrollContent = useRef(null);

  const { innerWidth, innerHeight, location } = window;
  const landscape = innerWidth > innerHeight;

  const [scroll, subscribe, unsubscribe, manualScroll] = useCustomScroll(
    scrollContent,
    {
      distance: 100,
      duration: 2000,
      timing: [0, 0, 0.2, 1]
    },
    {
      limitMod: {
        bottom() {
          return location.pathname === "/contact"
            ? 0
            : innerWidth <= 480 || (landscape && innerWidth <= 823)
            ? innerHeight
            : innerHeight / 2;
        }
      },
      withRouter: true
    }
  );

  return (
    <ScrollContext.Provider
      value={{ subscriber: [subscribe, unsubscribe], manualScroll }}
    >
      <main>
        <VerticalNav />
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
                    path={projectTitleToPath(project.title)}
                    render={() => <Project project={project} />}
                    key={id}
                  />
                ))}
                <Route exact path="/contact" component={Contact} />
                <Redirect to="/" />
              </Switch>
            </div>
          </div>
          <Route
            exact
            path={[
              "/",
              "/agency",
              "/work",
              "/privacy-policy",
              "/projects/:project"
            ]}
            component={Footer}
          />
        </div>
      </main>
      <Cursor />
      <MenuButton />
      <Menu />
      <ArrowButton />
      <Intro />
      <Loader />
      <FooterLoader />
    </ScrollContext.Provider>
  );
};

export default App;
