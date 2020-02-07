import React, { useRef, RefObject, useEffect } from "react";
import SectionHeader from "../shared/SectionHeader";
import Member from "./team/Member";
import useRevealSection from "hooks/useRevealSection";
import useTransition from "hooks/useTransition";
import useIntersection from "hooks/useIntersection";
import { ease } from "utils/timings";
import "./Team.scss";
import useParallax from "hooks/useParallax";

const Team = (): JSX.Element => {
  const section = useRef(null);
  const reveal = useRevealSection(section);

  const slideToRight = (ref: RefObject<HTMLImageElement>): (() => void) =>
    useTransition(ref, {
      from: { transform: "translateX(-10px) scaleX(1.1)" },
      to: { transform: "translateX(0) scaleX(1)" },
      config: {
        duration: 850,
        timing: ease
      }
    });

  const leftImage = useRef(null);
  const rightImage = useRef(null);

  const slideLeftImage = slideToRight(leftImage);
  const slideRightImage = slideToRight(rightImage);

  const [isIntersectingRightImage, disconnectObserver] = useIntersection(
    rightImage,
    {
      threshold: window.innerHeight <= 1024 ? 0.01 : 0.2
    }
  );

  useEffect((): void => {
    if (reveal) slideLeftImage();
  }, [reveal]);

  useEffect((): void => {
    if (isIntersectingRightImage) {
      slideRightImage();
      disconnectObserver();
    }
  }, [isIntersectingRightImage]);

  const contentParallax = useRef(null);
  useParallax(contentParallax, { min: 15, max: -3 });

  return (
    <div className="team" ref={section}>
      <SectionHeader text="who we are" show={reveal} />
      <div className="team-inner">
        <div className="team-left">
          <Member
            img="https://alfacharlie.b-cdn.net/wp-content/uploads/2019/06/Kimberly-Gilroy-3.jpg"
            name="Kimberly Gilroy"
            position="co-founder + brand strategist"
            about={
              "A New York native, Kimberly spearheads brand strategy and " +
              "client outreach — fueling her love for people, building " +
              "community and helping clients deliver their mission to the " +
              "right audience, in the right way."
            }
            show={reveal}
            imgRef={leftImage}
          />
        </div>
        <div className="team-right">
          <div
            className="team-content"
            ref={contentParallax}
            style={{ transform: "translateY(15%)" }}
          >
            <h3 className="team-title">
              We are a team of two with a network of many.
            </h3>
            <p className="team-text">
              We value creativity and collaboration, both with our clients and
              partners. We set ourselves apart with experience, meticulous care,
              and efficiency.
            </p>
          </div>
          <Member
            img="https://alfacharlie.b-cdn.net/wp-content/uploads/2019/05/Reva-Green.jpg"
            name="Reva Green"
            position="co-founder + creative director"
            about={
              "An avid world traveler, Reva brings her passion for culture to " +
              "the world of design. With roots in Paris and California, Reva " +
              "is our Creative Director, bringing her strong design knowledge " +
              "and expertise to each project."
            }
            show={isIntersectingRightImage}
            imgRef={rightImage}
          />
        </div>
      </div>
    </div>
  );
};

export default Team;
