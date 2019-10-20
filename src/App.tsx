import React, { useState } from "react";
import Logo from "components/Logo";
import Header from "components/Header";
import VerticalNav from "components/VerticalNav";
import MenuButton from "components/MenuButton";
import Menu from "components/Menu";
import "./styles.scss";

const App = (): JSX.Element => {
  const [menuIsOpen, openMenu] = useState<boolean>(false);

  const toggleMenu = (): void => openMenu(!menuIsOpen);

  return (
    <React.Fragment>
      <main>
        <VerticalNav
          links={[
            ["All", true],
            ["Design", false],
            ["Wellness", false],
            ["Agency", false]
          ]}
          reveal={true}
        />
        <div className="scroll-content-wrapper">
          <div className="scroll-content">
            <Logo />
            <Header />
            <div className="main-content"></div>
          </div>
        </div>
      </main>
      <MenuButton menuIsOpen={menuIsOpen} toggle={toggleMenu} />
      <Menu isOpen={menuIsOpen} />
    </React.Fragment>
  );
};

export default App;
