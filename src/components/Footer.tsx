import React, { useRef } from "react";
import FooterText from "./FooterText";
import { capitalize, projectTitleToPath } from "utils/string";
import projects from "data/projects.json";
import FooterLink from "./footer/Link";
import useTransition, { TransitionProps } from "hooks/useTransition";
import useBoundingClientRect from "hooks/useBoundingClientRect";
import { ease, easeOut2, easeInOut } from "utils/timings";
import { fadeOut } from "utils/transitions";
import "./Footer.scss";

interface Props {
  currentProject?: string;
}

const Footer = ({ currentProject }: Props): JSX.Element => {
  const footer = useRef(null);
  const background = useRef(null);
  const cta = useRef(null);
  const heading = useRef(null);
  const subHeading = useRef(null);
  const textLeft = useRef(null);
  const textCenter = useRef(null);
  const textRight = useRef(null);

  const headingRect = useBoundingClientRect(heading) || { top: 0, height: 0 };

  const bringToFront = useTransition(footer, {
    from: { zIndex: 200 },
    to: { zIndex: 200 },
    config: {
      duration: 0
    }
  });

  const expandBackground = useTransition(background, {
    from: { height: "50%" },
    to: { height: "100%" },
    config: {
      duration: 1000,
      delay: 500,
      timing: easeInOut
    }
  });

  const createFadeOut = (delay: number = 0): TransitionProps => ({
    ...fadeOut,
    config: {
      delay,
      duration: 350,
      timing: ease
    }
  });

  const fadeOutSubHeading = useTransition(subHeading, createFadeOut());
  const fadeOutLeft = useTransition(textLeft, createFadeOut());
  const fadeOutCenter = useTransition(textCenter, createFadeOut(400));
  const fadeOutRight = useTransition(textRight, createFadeOut(800));

  const slideContact = useTransition(cta, {
    from: { transform: "translateY(0)" },
    to: {
      transform: `translateY(-${headingRect.top -
        (window.innerHeight - headingRect.height) / 2}px)`
    },
    config: {
      delay: 900,
      duration: 900,
      timing: easeOut2
    }
  });

  const fadeOutText = (): void => {
    fadeOutSubHeading();
    fadeOutLeft();
    fadeOutCenter();
    fadeOutRight();
  };

  const hideFooter = async (): Promise<void> => {
    bringToFront();
    expandBackground();
    fadeOutText();
    return await slideContact();
  };

  const contact = (
    <React.Fragment>
      <FooterLink to="/contact" hideFooter={hideFooter} />
      <h3 ref={heading}>Let’s work together.</h3>
      <span ref={subHeading}>GET IN TOUCH</span>
    </React.Fragment>
  );

  const renderInnerContent = (): JSX.Element => {
    if (!currentProject) return contact;

    const projectTitle = currentProject
      .split("-")
      .map(capitalize)
      .join(" ");

    const index = projects.findIndex(({ title }) => projectTitle === title);
    const nextIndex = index === projects.length - 1 ? 0 : index + 1;
    const nextProjectTitle = projects[nextIndex].title;

    return (
      <React.Fragment>
        <FooterLink
          to={projectTitleToPath(nextProjectTitle)}
          hideFooter={hideFooter}
        />
        <h3>{nextProjectTitle}</h3>
        <span ref={subHeading}>VIEW NEXT PROJECT</span>
      </React.Fragment>
    );
  };

  return (
    <footer className="footer" ref={footer}>
      <div className="footer-background" ref={background} />
      <div className="footer-content">
        <div className="footer-contact" ref={cta}>
          <div className="footer-contact-inner">{renderInnerContent()}</div>
        </div>
        <FooterText left={textLeft} center={textCenter} right={textRight} />
      </div>
    </footer>
  );
};

export default Footer;
