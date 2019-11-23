import React from "react";
import "./Item.scss";

interface Props {
  text: string;
}

const Item = ({ text }: Props): JSX.Element => (
  <div className="info-list-item">
    <span>{text}</span>
  </div>
);

export default Item;
