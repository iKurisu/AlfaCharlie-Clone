import React from "react";
import Link from "./navigation/Link";
import "./Navigation.scss";

const Navigation = (): JSX.Element => {
  const links = ["agency", "work", "journal", "contact"];

  return (
    <div className="menu-nav-wrapper -flex">
      <nav className="menu-nav-links -flex">
        {links.map(
          (link: string, id: number): JSX.Element => (
            <Link link={link} key={id} />
          )
        )}
      </nav>
    </div>
  );
};

export default Navigation;
