import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import Project from "./work/Project";
import FooterArt from "components/FooterArt";
import { introActions } from "modules/intro";
import { IntroActionTypes } from "modules/intro/types";
import { Filters } from "modules/work/types";
import projects from "data/projects.json";
import { ACProject } from "data/types";
import "./Work.scss";

interface MappedState {
  filter: Filters;
}

interface MappedActions {
  toggleIntro: () => IntroActionTypes;
}

type Props = MappedState & MappedActions;

const Work = ({ filter, toggleIntro }: Props): JSX.Element => {
  useEffect((): void => {
    toggleIntro();
    document.title =
      "Brand Identity, Web Design and Design Case Studies | " +
      "Alfa Charlie | Work";
  }, []);

  const mapProject = (project: ACProject, id: number): JSX.Element => {
    return (
      <Project projectTitle={project.title} {...project.article} key={id} />
    );
  };

  const reduceProjects = (
    filteredProjects: JSX.Element[],
    project: ACProject,
    id: number
  ): JSX.Element[] => {
    return project.types.includes(filter as "BRANDING" | "DIGITAL")
      ? filteredProjects.concat(mapProject(project, id))
      : filteredProjects;
  };

  return (
    <React.Fragment>
      <div className="work">
        {filter === "ALL"
          ? projects.map(mapProject)
          : projects.reduce(reduceProjects, [])}
      </div>
      <FooterArt />
    </React.Fragment>
  );
};

const mapState = (state: AppState): MappedState => ({
  filter: state.work.visibilityFilter
});

const mapDispatch: MappedActions = {
  toggleIntro: introActions.toggleIntro
};

export default connect(mapState, mapDispatch)(Work);
