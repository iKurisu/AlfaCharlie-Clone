import React from "react";
import Logo from "components/Logo";
import Header from "components/Header";
import VerticalNav from "components/VerticalNav";
import MenuButton from "components/MenuButton";
import Menu from "components/Menu";
import Cursor from "components/Cursor";
import "./styles.scss";

const App = (): JSX.Element => (
  <React.Fragment>
    <main>
      <VerticalNav
        links={[
          ["All", true],
          ["Design", false],
          ["Wellness", false],
          ["Agency", false]
        ]}
        show={true}
      />
      <div className="scroll-content-wrapper">
        <div className="scroll-content">
          <Logo />
          <Header />
          <div className="main-content"></div>
        </div>
      </div>
    </main>
    <Cursor />
    <MenuButton />
    <Menu />
  </React.Fragment>
);

export default App;
