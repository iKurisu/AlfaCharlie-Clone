import React from "react";
import SectionHeader from "./SectionHeader";
import List from "../shared/info/List";
import Link from "../shared/Link";
import "./Info.scss";

interface Props {
  header: string;
  image: string;
  title: string;
  text: string;
  link?: boolean;
  align?: "left" | "right";
}

const Info = ({
  header,
  image,
  title,
  text,
  link = false,
  align = "right"
}: Props): JSX.Element => {
  return (
    <section className={`info -align-${align}`}>
      <SectionHeader text={header} />
      <div className="info-image-wrapper">
        <div className="info-image">
          <div className="image-wrapper">
            <img src={image} />
          </div>
        </div>
      </div>
      <div className="info-content-wrapper">
        <div className="info-content">
          <div>
            <h3 className="info-title">{title}</h3>
          </div>
          <div>
            <p className="info-text">{text}</p>
          </div>
          <div>
            <List />
          </div>
          <div>{link && <Link content="Learn more" />}</div>
        </div>
      </div>
    </section>
  );
};

export default Info;
