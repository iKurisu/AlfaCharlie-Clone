import React from "react";
import { renderItem } from "pages/shared/ListItem";

const leftItems = [
  "American Ninja Warrior Experience",
  "ATS Sports International",
  "ChamberlaynePR",
  "Classic Journeys",
  "Crypto Catalyst Capital",
  "Diamond Solutions"
];

const centerItems = [
  "Fab Lab San Diego",
  "GRx Baseball",
  "House of Blues",
  "Mad Monk Tea",
  "Red Bull",
  "Rhum Bar"
];

const rightItems = [
  "San Diego Foundation",
  "Scale San Diego",
  "Silverstein Properties",
  "Sorensen Elite",
  "Symbiotic Training",
  "VendiBean"
];

const List = (): JSX.Element => (
  <div className="clients-list">
    <ul className="clients-list-left">{leftItems.map(renderItem)}</ul>
    <ul className="clients-list-center">{centerItems.map(renderItem)}</ul>
    <ul className="clients-list-right">{rightItems.map(renderItem)}</ul>
  </div>
);

export default List;
