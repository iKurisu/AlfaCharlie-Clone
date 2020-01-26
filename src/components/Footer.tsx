import React, { useRef, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ScrollContext } from "../App";
import FooterText from "./FooterText";
import FooterLink from "./footer/Link";
import useTransition, { TransitionProps } from "hooks/useTransition";
import useBoundingClientRect from "hooks/useBoundingClientRect";
import { projectTitleToPath } from "utils/string";
import { ease, easeOut2, easeInOut } from "utils/timings";
import { fadeOut, fadeIn } from "utils/transitions";
import { findNextTitle } from "utils/projects";
import "./Footer.scss";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";

interface Params {
  project: string;
}

const Footer = (): JSX.Element => {
  const params = useParams<Params>();

  const footer = useRef(null);
  const background = useRef(null);
  const cta = useRef(null);
  const heading = useRef(null);
  const subHeading = useRef(null);
  const textLeft = useRef(null);
  const textCenter = useRef(null);
  const textRight = useRef(null);

  const headingRect = useBoundingClientRect(heading) || { top: 0, height: 0 };

  const {
    subscriber: [subscribe, unsubscribe]
  } = useContext(ScrollContext);

  const bringToFront = useTransition(footer, {
    from: { zIndex: 200 },
    to: { zIndex: 200 },
    config: {
      duration: 0
    }
  });

  const bringToBack = useTransition(footer, {
    from: { zIndex: 200 },
    to: { zIndex: 0 },
    config: { duration: 0 }
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

  const resetBackground = useTransition(background, {
    from: { height: "100%" },
    to: { height: "50%" },
    config: { duration: 0 }
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

  const resetSubHeading = useTransition(subHeading, {
    ...fadeIn,
    config: { duration: 0 }
  });

  const transform = `translateY(${-headingRect.top +
    (window.innerHeight - headingRect.height) / 2}px)`;

  const slideContact = useTransition(cta, {
    from: { transform: "translateY(0)" },
    to: {
      transform
    },
    config: {
      delay: 900,
      duration: 900,
      timing: easeOut2
    }
  });

  const resetContact = useTransition(cta, {
    from: { transform },
    to: { transform: "translateY(0)" },
    config: {
      duration: 0
    }
  });

  const fadeOutText = (): void => {
    fadeOutSubHeading();
    fadeOutLeft();
    fadeOutCenter();
    fadeOutRight();
  };

  const resetFooter = (): void => {
    bringToBack();
    resetBackground();
    resetContact();
    resetSubHeading();
  };

  const hideFooter = async (): Promise<void> => {
    bringToFront();
    expandBackground();
    fadeOutText();
    return await slideContact().then(() => {
      if (params.project) resetFooter();
    });
  };

  const createTextFadeIn = (delay = 0): TransitionProps => ({
    from: { opacity: 0, transform: "translateY(10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: {
      delay,
      duration: 500,
      timing: ease
    }
  });

  const createTextFadeOut = (delay = 0): TransitionProps => ({
    from: { opacity: 1, transform: "translateY(0)" },
    to: { opacity: 0, transform: "translateY(10px)" },
    config: {
      delay,
      duration: 350,
      timing: ease
    }
  });

  const fadeInTextLeft = useTransition(textLeft, createTextFadeIn());
  const fadeInTextCenter = useTransition(textCenter, createTextFadeIn(400));
  const fadeInTextRight = useTransition(textRight, createTextFadeIn(800));

  const fadeInFooterText = (): void => {
    fadeInTextLeft();
    fadeInTextCenter();
    fadeInTextRight();
  };

  const fadeOutTextLeft = useTransition(textLeft, createTextFadeOut());
  const fadeOutTextCenter = useTransition(textCenter, createTextFadeOut(200));
  const fadeOutTextRight = useTransition(textRight, createTextFadeOut(400));

  const fadeOutFooterText = (): void => {
    fadeOutTextLeft();
    fadeOutTextCenter();
    fadeOutTextRight();
  };

  const [footerTextToggled, setFooterTextToggled] = useState(false);

  const toggleFooterText = (scroll: number, max: number): void => {
    setFooterTextToggled(scroll < max + window.innerHeight * 0.2);
  };

  useDidUpdateEffect((): void => {
    footerTextToggled ? fadeInFooterText() : fadeOutFooterText();
  }, [footerTextToggled]);

  useEffect((): (() => void) => {
    subscribe(toggleFooterText);

    return () => unsubscribe(toggleFooterText);
  }, []);

  const contact = (
    <React.Fragment>
      <FooterLink to="/contact" hideFooter={hideFooter} />
      <h3 ref={heading}>Let’s work together.</h3>
      <span ref={subHeading}>GET IN TOUCH</span>
    </React.Fragment>
  );

  const renderInnerContent = (): JSX.Element => {
    if (!params.project) return contact;

    const nextProjectTitle = findNextTitle(params.project);

    return (
      <React.Fragment>
        <FooterLink
          to={projectTitleToPath(nextProjectTitle)}
          hideFooter={hideFooter}
        />
        <h3 ref={heading}>{nextProjectTitle}</h3>
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
