import React from "react";

interface Props {
  component?: string;
  text: string;
}

const ListItem = ({ component, text }: Props): JSX.Element => (
  <li className={`${component ? `${component}-` : ""}list-item`}>
    <span>{text}</span>
  </li>
);

// eslint-disable-next-line react/display-name
export const renderItem = (component: string) => (
  item: string,
  id: number
): JSX.Element => <ListItem component={component} text={item} key={id} />;

export default ListItem;
