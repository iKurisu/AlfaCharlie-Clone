import React from "react";
import "./ListItem.scss";

interface Props {
  text: string;
}

const ListItem = ({ text }: Props): JSX.Element => (
  <li className="list-item">
    <span>{text}</span>
  </li>
);

export const renderItem = (item: string, id: number): JSX.Element => (
  <ListItem text={item} key={id} />
);

export default ListItem;
