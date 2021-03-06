import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import Project from "./work/Project";
import FooterArt from "components/FooterArt";
import { Filters } from "modules/work/types";
import projects from "data/projects.json";
import { ACProject } from "data/types";
import useTransition from "hooks/useTransition";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import { easeInOut } from "utils/timings";
import { classList } from "utils/class";
import "./Work.scss";

interface MappedState {
  filter: Filters;
}

type Props = MappedState;

const Work = ({ filter }: Props): JSX.Element => {
  const [visibleProjects, setVisibleProjects] = useState(projects);
  const filteredTitles = useRef([]);
  const [pointerEvents, setPointerEvents] = useState(true);
  const projectRefs = projects.map(project => ({
    title: project.title,
    ref: useRef(null)
  }));

  const filterTitles = (nextProjects: ACProject[]): void => {
    filteredTitles.current = nextProjects.map(project => project.title);
  };

  const hideAnimations = projectRefs.map(({ title, ref }) => ({
    title,
    animation: useTransition(ref, {
      from: { transform: "translateY(100%)" },
      to: { transform: "translateY(0)" },
      config: {
        duration: 1000,
        delay: Math.floor(Math.random() * 5) * 50,
        timing: easeInOut
      }
    })
  }));

  const showAnimations = projectRefs.map(({ title, ref }) => ({
    title,
    animation: useTransition(ref, {
      from: { transform: "translateY(0)" },
      to: { transform: "translateY(-100%)" },
      config: {
        duration: 800,
        delay: Math.floor(Math.random() * 5) * 50,
        timing: easeInOut
      }
    })
  }));

  const mapProject = (project: ACProject, id: number): JSX.Element => {
    return (
      <Project
        projectTitle={project.title}
        {...project.article}
        coverRef={projectRefs.find(({ title }) => title === project.title).ref}
        key={id}
      />
    );
  };

  const reduceToPromises = (
    acc: Promise<void>[],
    { title, animation }: { title: string; animation: () => Promise<void> }
  ): Promise<void>[] => {
    return filteredTitles.current.includes(title) ? [...acc, animation()] : acc;
  };

  useDidUpdateEffect((): void => {
    const promises =
      filteredTitles.current.length === 0
        ? hideAnimations.map(({ animation }) => animation())
        : hideAnimations.reduce(reduceToPromises, []);

    setPointerEvents(false);

    Promise.all(promises).then(() => {
      const nextProjects =
        filter === "ALL"
          ? projects
          : projects.filter(project => project.types.includes(filter));

      setVisibleProjects(nextProjects);
      filterTitles(nextProjects as ACProject[]);

      const promises = showAnimations.reduce(reduceToPromises, []);

      Promise.all(promises).then(() => setPointerEvents(true));
    });
  }, [filter]);

  useEffect((): void => {
    document.title =
      "Brand Identity, Web Design and Design Case Studies | " +
      "Alfa Charlie | Work";
  }, []);

  return (
    <React.Fragment>
      <div className={classList(["work", { "-no-pe": !pointerEvents }])}>
        {visibleProjects.map(mapProject)}
      </div>
      <FooterArt />
    </React.Fragment>
  );
};

const mapState = (state: AppState): MappedState => ({
  filter: state.work.visibilityFilter
});

export default connect(mapState)(Work);
