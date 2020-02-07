import projects from "data/projects.json";

/** Maps a project parameter (ie: `grx-baseball`) to its corresponding title. */
export const mapProjectParamToTitle = (projectParam: string): string => {
  const lowerCaseTitle = projectParam.replace(/-/g, " ");
  const project = projects.find(
    ({ title }) => title.toLowerCase() === lowerCaseTitle
  );

  return project.title;
};

/** Finds the next project's title.
 * @param projectParam A project name from the params object, such as: `rhum-bar`.
 */
export const findNextTitle = (projectParam: string): string => {
  const lowerCaseTitle = projectParam.replace(/-/g, " ");

  const index = projects.findIndex(
    ({ title }) => lowerCaseTitle === title.toLowerCase()
  );
  const nextIndex = index === projects.length - 1 ? 0 : index + 1;
  return projects[nextIndex].title;
};
