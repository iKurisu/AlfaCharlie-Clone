import React, { useEffect } from "react";
import { connect } from "react-redux";
import Project from "./work/Project";
import { introActions } from "modules/intro";
import { IntroActionTypes } from "modules/intro/types";
import projects from "data/projects.json";
import { ACProject } from "data/types";
import "./Work.scss";

interface MappedActions {
  toggleIntro: () => IntroActionTypes;
}

type Props = MappedActions;

const Work = ({ toggleIntro }: Props): JSX.Element => {
  useEffect((): void => {
    toggleIntro();
    document.title =
      "Brand Identity, Web Design and Design Case Studies | " +
      "Alfa Charlie | Work";
  }, []);

  return (
    <div className="work">
      {projects.map(({ article }: ACProject, id: number) => (
        <Project {...article} key={id} />
      ))}
    </div>
  );
};

const mapDispatch: MappedActions = {
  toggleIntro: introActions.toggleIntro
};

export default connect(
  null,
  mapDispatch
)(Work);
