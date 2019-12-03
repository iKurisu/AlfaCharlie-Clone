import React from "react";
import "./Item.scss";

interface Props {
  text: string;
}

const Item = ({ text }: Props): JSX.Element => (
  <li className="info-list-item">
    <span>{text}</span>
  </li>
);

export default Item;
