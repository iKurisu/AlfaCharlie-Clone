import React from "react";
import LoaderLink from "components/LoaderLink";
import { Author } from "./testimonials/Slider";
import "./Link.scss";

interface Props {
  content: string | Author;
  to: string;
}

const Link = ({ content, to }: Props): JSX.Element => {
  const renderLinkText = (): JSX.Element =>
    typeof content === "string" ? (
      <span className="link-text">{content}</span>
    ) : (
      <React.Fragment>
        <span className="link-author">{content.name}</span>
        <span className="link-position">{content.position}</span>
      </React.Fragment>
    );

  const renderContent = (): JSX.Element => (
    <React.Fragment>
      <span className="link-line"></span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 157.34 51.71"
        xmlSpace="preserve"
      >
        <polyline points="128.65,45.62 148.36,25.91 128.47,6.02 " />
        <line x1="8.46" y1="25.91" x2="147.73" y2="25.91" />
      </svg>
      <span className="link-text-wrapper">{renderLinkText()}</span>
    </React.Fragment>
  );

  const renderWithWrapper = (): JSX.Element =>
    to[0] === "/" ? (
      <LoaderLink className="main-link" to={to}>
        {renderContent()}
      </LoaderLink>
    ) : (
      <a
        className="main-link"
        href={to}
        target="_blank"
        rel="noopener noreferrer"
      >
        {renderContent()}
      </a>
    );

  return renderWithWrapper();
};

export default Link;
