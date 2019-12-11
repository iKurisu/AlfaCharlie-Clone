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

const renderInfoItem = renderItem("info");

const List = (): JSX.Element => (
  <div className="info-list">
    <ul className="info-list-left">{leftItems.map(renderInfoItem)}</ul>
    <ul className="info-list-right">{rightItems.map(renderInfoItem)}</ul>
  </div>
);

export default List;
