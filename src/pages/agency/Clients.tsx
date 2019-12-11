import React from "react";
import SectionHeader from "pages/shared/SectionHeader";
import "./Clients.scss";
import List from "./clients/List";

const Clients = (): JSX.Element => (
  <section className="clients">
    <SectionHeader text="our clients" />
    <div className="clients-top">
      <div className="clients-image-wrapper">
        <div className="clients-image">
          <img
            src={
              "https://alfacharlie.b-cdn.net/wp-content/uploads/" +
              "2019/04/House-of-Blues-Skate-Deck.jpg"
            }
          />
        </div>
      </div>
      <div className="clients-content">
        <h3 className="clients-title">Strong partnerships make bold brands.</h3>
        <p className="clients-text">
          We work with global companies and entrepreneurs alike, who value great
          design and long-term collaboration.
        </p>
      </div>
    </div>
    <div className="clients-bottom">
      <List />
    </div>
  </section>
);

export default Clients;
