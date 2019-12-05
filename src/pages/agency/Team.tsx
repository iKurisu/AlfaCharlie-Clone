import React from "react";
import SectionHeader from "../shared/SectionHeader";
import Member from "./team/Member";
import "./Team.scss";

const Team = (): JSX.Element => (
  <div className="team">
    <SectionHeader text="who we are" />
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
        />
      </div>
      <div className="team-right">
        <div className="team-content">
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
        />
      </div>
    </div>
  </div>
);

export default Team;
