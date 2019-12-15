import React from "react";

interface Props {
  title: string[];
  img: string;
}

const Project = ({ title, img }: Props): JSX.Element => (
  <article className="project">
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
  </article>
);

export default Project;
