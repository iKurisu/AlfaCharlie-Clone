import React, { useState } from "react";
import SliderNav from "../shared/SliderNav";
import { classList } from "utils/class";
import "./Form.scss";

interface Props {
  names: string[];
  show: boolean;
}

interface Lookup {
  [k: string]: string;
}

const labels: Lookup = {
  name: "Ahoy. What's your name?",
  email: "What's your email?",
  company: "Tell us a bit about your company.",
  project: "Tell us a bit about your project.",
  hello: "What would you like to chat about?",
  birthday: "We love celebrations. When is your birthday?"
};

const errors: Lookup = {
  name: "Please enter a valid name.",
  email: "Please enter a valid email.",
  company: "Please tell us about your company.",
  project: "Please tell us about your project.",
  hello: "Please enter a valid message.",
  birthday: "Please provide a valid birthday."
};

const Form = ({ names, show }: Props): JSX.Element => {
  const [slide, setSlide] = useState(0);

  const changeSlide = (slide: number) => () => setSlide(slide);

  return (
    <div className={classList(["contact-form-wrapper", { "-active": show }])}>
      <form className="contact-form">
        <div className="form-bullets">
          <SliderNav
            slides={names}
            currentSlideID={slide}
            swipeSlide={changeSlide}
          />
        </div>
        <div className="form-labels">
          {names.map((name, id) => (
            <label
              className={classList(["form-label", { "-active": slide === id }])}
              htmlFor={name}
              key={id}
            >
              <h3>{labels[name]}</h3>
            </label>
          ))}
        </div>
        <div className="form-inputs">
          {names.map((name, id) => (
            <input
              className={classList(["form-input", { "-active": slide === id }])}
              name={name}
              key={id}
            />
          ))}
        </div>
        <div className="form-errors">
          {names.map((name, id) => (
            <span
              className={classList(["form-error", { "-active": slide === id }])}
              key={id}
            >
              {errors[name]}
            </span>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Form;
