import React, { useState } from "react";
import Logo from "components/Logo";
import Header from "components/Header";
import "./styles.scss";

const App = (): JSX.Element => {
    
  return (
    <React.Fragment>
      <main>
        <div className="scroll-content-wrapper">
          <div className="scroll-content">
            <Logo />
            <Header />
  </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default App;
