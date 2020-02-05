import React, { useRef } from "react";
import SectionHeader from "./SectionHeader";
import List from "../shared/info/List";
import Link from "../shared/Link";
import Mask from "components/slider/Mask";
import useTransition from "hooks/useTransition";
import { ease } from "utils/timings";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import useRevealSection from "hooks/useRevealSection";
import "./Info.scss";
import useParallax from "hooks/useParallax";

interface Props {
  header: string;
  image: string;
  title: string;
  text: string;
  link?: string;
  align?: "left" | "right";
}

const Info = ({
  header,
  image,
  title,
  text,
  link,
  align = "right"
}: Props): JSX.Element => {
  const section = useRef(null);
  const revealSection = useRevealSection(section);

  const imageParallax = useRef(null);
  useParallax(imageParallax, { min: -4, max: 2 });

  const contentParallax = useRef(null);
  useParallax(contentParallax, { min: 2, max: -1 });

  const infoImage = useRef(null);
  const slideImageToLeft = useTransition(infoImage, {
    from: { transform: "translateX(10px) scaleX(1.1)" },
    to: { transform: "translateX(0) scaleX(1)" },
    config: {
      duration: 850,
      timing: ease
    }
  });

  useDidUpdateEffect((): void => {
    slideImageToLeft();
  }, [revealSection]);

  return (
    <section className={`info -align-${align}`} ref={section}>
      <SectionHeader text={header} show={revealSection} />
      <div className="info-image-wrapper">
        <div className="parallax-item">
          <Mask
            isOpen={revealSection}
            options={{ fadeDirection: "left", delay: 0 }}
          />
          <div className="info-image" ref={imageParallax}>
            <div
              className="image-wrapper"
              ref={infoImage}
              style={{ transform: "translateX(10px) scaleX(1.1)" }}
            >
              <img src={image} />
            </div>
          </div>
        </div>
      </div>
      <div className="info-content-wrapper">
        <div className="info-content" ref={contentParallax}>
          <div>
            <h3 className="info-title">{title}</h3>
          </div>
          <div>
            <p className="info-text">{text}</p>
          </div>
          <div>
            <List />
          </div>
          <div>{link && <Link content="Learn more" to={link} />}</div>
        </div>
      </div>
    </section>
  );
};

export default Info;
