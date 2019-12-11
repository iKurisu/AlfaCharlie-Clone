import React from "react";
import { renderItem } from "../ListItem";
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
    <ul className="info-list-left">{leftItems.map(renderItem)}</ul>
    <ul className="info-list-right">{rightItems.map(renderItem)}</ul>
  </div>
);

export default List;
