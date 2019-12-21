import React, { useState } from "react";
import Arrow from "./contact/Arrow";
import Form from "./contact/Form";
import "./Contact.scss";

enum Forms {
  START_A_PROJECT = "START_A_PROJECT",
  SAY_HELLO = "SAY_HELLO"
}

type FormTypes = keyof typeof Forms;

const Contact = (): JSX.Element => {
  const [activeForm, setActiveForm] = useState<FormTypes>(null);

  const startAProject = (): void => setActiveForm(Forms.START_A_PROJECT);
  const sayHello = (): void => setActiveForm(Forms.SAY_HELLO);

  return (
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
        <div className="contact-label-left" onClick={startAProject}>
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
        <div className="contact-label-right" onClick={sayHello}>
          <div className="contact-label">
            <h2 className="label-title">
              <span>say hello</span>
              <span className="label-arrow">
                <Arrow />
              </span>
            </h2>
          </div>
        </div>
      </div>
      <Form
        names={["name", "email", "company", "project", "birthday"]}
        show={activeForm === Forms.START_A_PROJECT}
      />
      <Form
        names={["name", "email", "hello", "birthday"]}
        show={activeForm === Forms.SAY_HELLO}
      />
    </div>
  );
};

export default Contact;
