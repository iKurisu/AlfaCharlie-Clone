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

  return (
    <React.Fragment>
      <div className="work">
        {projects
          .filter(({ types }) => filter === "ALL" || types.includes(filter))
          .map(({ article }: ACProject, id: number) => (
            <Project {...article} key={id} />
          ))}
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
