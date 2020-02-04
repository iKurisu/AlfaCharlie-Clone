import React, { useContext, useRef, useEffect } from "react";
import { ScrollContext } from "../App";
import { ACProject } from "data/types";
import FooterArt from "components/FooterArt";
import Mask from "components/slider/Mask";
import useIntersection from "hooks/useIntersection";
import useTransition from "hooks/useTransition";
import { ease } from "utils/timings";
import "./Project.scss";

interface Props {
  project: ACProject;
}

const isVideo = (src: string): boolean => src.match(/\.mp4$/g) !== null;

const Project = ({ project }: Props): JSX.Element => {
  const leftCover = useRef(null);
  const rightCover = useRef(null);
  const double = useRef(null);
  const doubleImages = [useRef(null), useRef(null)];

  const [revealDoubleImages, disconnect] = useIntersection(double);

  const imagesAnimations = doubleImages.map(image =>
    useTransition(image, {
      from: { transform: "translateX(-10px) scale(1.1)" },
      to: { transform: "translateX(0) scale(1)" },
      config: {
        duration: 850,
        timing: ease
      }
    })
  );

  useEffect((): void => {
    if (revealDoubleImages) {
      imagesAnimations.forEach(animation => animation());
      disconnect();
    }
  }, [revealDoubleImages]);

  const {
    subscriber: [subscribe, unsubscribe]
  } = useContext(ScrollContext);

  const coverHero = (scroll: number): void => {
    const max = 350;
    if (scroll < -max) return;

    leftCover.current.style.transform = `translateX(${(-100 / max) * scroll -
      100}%)`;
    rightCover.current.style.transform = `translateX(${(100 / max) * scroll +
      100}%)`;
  };

  useEffect((): (() => void) => {
    subscribe(coverHero);
    return () => unsubscribe(coverHero);
  }, []);

  const renderItems = (item: string | string[], id: number): JSX.Element =>
    typeof item === "object" ? (
      <div className={`project-double`} key={id} ref={double}>
        {item.map((img, id) => (
          <div className="project-item-wrapper" key={id}>
            <div className="project-item">
              <Mask
                isOpen={revealDoubleImages}
                options={{ fadeDirection: "left", delay: 0 }}
              />
              <img src={img} ref={doubleImages[id]} />
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="project-item" key={id}>
        {isVideo(item) ? (
          <video src={item} loop muted autoPlay />
        ) : (
          <img src={item} />
        )}
      </div>
    );

  return (
    <React.Fragment>
      <div className="row">
        <div className="project-intro">
          <h5 className="project-intro-title">{project.title}</h5>
          <h3 className="project-intro-description">{project.description}</h3>
        </div>
      </div>
      <div className="project-hero">
        <div className="hero-cover -left" ref={leftCover} />
        <div className="hero-cover -right" ref={rightCover} />
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
          {project.leading.map(renderItems)}
        </div>
      </div>
      {project.quote ? (
        <div className="row">
          <div className="project-quote">
            <span className="quotemark">“</span>
            <div className="quote">
              <p>{project.quote.text}</p>
            </div>
            <div className="quote-author">
              <span className="quote-line"></span>
              <span className="author-name">{project.quote.author.name}</span>
              <span className="author-position">
                {project.quote.author.position}
              </span>
            </div>
          </div>
        </div>
      ) : null}
      <div className="row">
        <div className="project-lazy">{project.lazy.map(renderItems)}</div>
      </div>
      <FooterArt />
    </React.Fragment>
  );
};

export default Project;
