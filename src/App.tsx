import React, { useState } from "react";
import Logo from "components/Logo";
import Header from "components/Header";
import MenuButton from "components/MenuButton";
import "./styles.scss";

const App = (): JSX.Element => {
  const [menuIsOpen, openMenu] = useState<boolean>(false);

  const toggleMenu = (): void => openMenu(!menuIsOpen);

  return (
    <React.Fragment>
      <main>
        <div className="scroll-content-wrapper">
          <div className="scroll-content">
            <Logo />
            <Header />
            <div className="main-content"></div>
          </div>
        </div>
      </main>
      <MenuButton menuIsOpen={menuIsOpen} toggle={toggleMenu} />
    </React.Fragment>
  );
};

export default App;
