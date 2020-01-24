import React from "react";
import LoaderLink from "components/LoaderLink";
import FooterText from "./FooterText";
import { capitalize, projectTitleToPath } from "utils/string";
import projects from "data/projects.json";
import "./Footer.scss";

interface Props {
  currentProject?: string;
}

const Footer = ({ currentProject }: Props): JSX.Element => {
  const contact = (
    <React.Fragment>
      <LoaderLink to="/contact" />
      <h3>Let’s work together.</h3>
      <span>GET IN TOUCH</span>
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
        <LoaderLink to={projectTitleToPath(nextProjectTitle)} />
        <h3>{nextProjectTitle}</h3>
        <span>VIEW NEXT PROJECT</span>
      </React.Fragment>
    );
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-contact">
          <div className="footer-contact-inner">{renderInnerContent()}</div>
        </div>
        <FooterText />
      </div>
    </footer>
  );
};

export default Footer;
