import React from "react";
import Arrow from "./contact/Arrow";
import "./Contact.scss";

const Contact = (): JSX.Element => (
  <div className="contact">
    <div className="contact-image">
      <img
        src={
          "https://alfacharlie.b-cdn.net/wp-content/uploads/2019/" +
          "05/Alfa-Charlie-Design-Agency-Contact-4.jpg"
        }
      />
    </div>
    <div className="contact-labels">
      <div className="contact-label-left">
        <div className="contact-label">
          <h2 className="label-title">
            <span className="label-arrow">
              <Arrow />
            </span>
            <span>start a project</span>
          </h2>
        </div>
      </div>
      <div className="contact-label-separator" />
      <div className="contact-label-right">
        <div className="contact-label">
          <h2 className="label-title">
            <span>say hello</span>
            <span className="label-arrow">
              <Arrow />
            </span>
          </h2>
        </div>
      </div>
      <div className="contact-form-wrapper">
        <div className="contact-form"></div>
      </div>
      <div className="contact-form-wrapper">
        <div className="contact-form"></div>
      </div>
    </div>
  </div>
);

export default Contact;
