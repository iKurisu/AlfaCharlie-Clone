import React from "react";
import Item from "./list/Item";
import "./List.scss";

const leftItems = [
  "Brand Strategy",
  "Naming",
  "Brand Tone & Voice",
  "Visual Identity",
  "Print Design",
  "Packaging Design",
  "Editorial"
];

const rightItems = [
  "Art Direction",
  "UX Design",
  "Frontend Development",
  "Copywriting",
  "Photography",
  "Videography"
];

const List = (): JSX.Element => (
  <div className="info-list">
    <div className="info-list-left">
      {leftItems.map((item, id) => (
        <Item text={item} key={id} />
      ))}
    </div>
    <div className="info-list-right">
      {rightItems.map((item, id) => (
        <Item text={item} key={id} />
      ))}
    </div>
  </div>
);

export default List;
