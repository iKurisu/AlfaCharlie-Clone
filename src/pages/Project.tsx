import React from "react";
import "./Project.scss";
import { ACProject } from "data/types";

interface Props {
  project: ACProject;
}

const isVideo = (src: string): boolean => src.match(/\.mp4$/g) !== null;

const Project = ({ project }: Props): JSX.Element => (
  <React.Fragment>
    <div className="row">
      <div className="project-intro">
        <h5 className="project-title">{project.title}</h5>
        <h3 className="project-description">{project.description}</h3>
      </div>
    </div>
    <div className="project-hero">
      <div className="hero-image-wrapper">
        <img src={project.hero} />
      </div>
    </div>
    <div className="row">
      <div className="project-info">
        <div className="project-info-left">
          <div className="project-info-text">
            <p>{project.info}</p>
          </div>
        </div>
        <div className="project-info-right">
          <ul className="project-meta">
            <li>
              <h5 className="project-meta-title">CLIENT</h5>
              <h5 className="project-meta-description">{project.client}</h5>
            </li>
            <li>
              <h5 className="project-meta-title">YEAR</h5>
              <h5 className="project-meta-description">{project.year}</h5>
            </li>
            <li>
              <h5 className="project-meta-title">SERVICES</h5>
              <div className="project-meta-description">
                <ul className="project-services">
                  {project.services.map((service, id) => (
                    <li key={id}>
                      <h5>{service}</h5>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="project-leading">
        {project.leading.map((item, id) =>
          typeof item === "object" ? (
            <div className="project-leading-double" key={id}>
              {item.map((img, id) => (
                <div className="project-item-wrapper" key={id}>
                  <div className="project-item">
                    <img src={img} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="project-item" key={id}>
              {isVideo(item) ? <video src={item} /> : <img src={item} />}
            </div>
          )
        )}
      </div>
    </div>
    {project.quote ? <div className="row"></div> : null}
    <div className="row">
      <div className="project-lazy">
        {project.lazy.map((item, id) =>
          typeof item === "object" ? (
            <div className="project-lazy-double" key={id}>
              {item.map((img, id) => (
                <div className="project-item-wrapper" key={id}>
                  <div className="project-item">
                    <img src={img} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="project-item" key={id}>
              {isVideo(item) ? <video src={item} /> : <img src={item} />}
            </div>
          )
        )}
      </div>
    </div>
  </React.Fragment>
);

export default Project;