import React, { RefObject } from "react";
import LoaderLink from "components/LoaderLink";

interface Props {
  projectTitle: string;
  title: string[];
  img: string;
  coverRef: RefObject<HTMLDivElement>;
}

const Project = ({
  projectTitle,
  title,
  img,
  coverRef
}: Props): JSX.Element => {
  const formattedTitle = projectTitle.replace(/ /g, "-").toLowerCase();
  const url = `projects/${formattedTitle}`;

  return (
    <article className="project">
      <LoaderLink to={url} />
      <div className="project-image-wrapper">
        <div className="project-image-crop">
          <div className="project-crop" />
          <div className="project-crop" />
          <div className="project-crop" />
          <div className="project-crop" />
        </div>
        <div className="project-image">
          <img src={img} />
        </div>
      </div>
      <div className="project-title">
        <h2 className="project-title-top">
          {title[0].split(" ").map((t, id) => (
            <span key={id}>
              {t.split("").map((c, id) => (
                <span className="char" key={id}>
                  {c}
                </span>
              ))}
            </span>
          ))}
        </h2>
        <h2 className="project-title-bottom">
          {title[1].split(" ").map((t, id) => (
            <span key={id}>
              {t.split("").map((c, id) => (
                <span className="char" key={id}>
                  {c}
                </span>
              ))}
            </span>
          ))}
        </h2>
      </div>
      <div className="project-cover-wrapper">
        <div className="project-cover" ref={coverRef} />
      </div>
    </article>
  );
};

export default Project;
