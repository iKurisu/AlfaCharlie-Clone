import React, { useRef } from "react";

interface Props {
  char: string;
  order: number;
  isOpen: boolean;
}

const Character = ({ char, order, isOpen }: Props): JSX.Element => {
  const character = useRef(null);

  return (
    <span className="link-character" ref={character}>
      {char}
    </span>
  );
};

export default Character;
