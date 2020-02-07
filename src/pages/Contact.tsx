import React, { useState, useRef, useEffect } from "react";
import Arrow from "./contact/Arrow";
import Form from "./contact/Form";
import "./Contact.scss";
import { classList } from "utils/class";
import useForm from "hooks/useForm";
import useTransition, { TransitionProps } from "hooks/useTransition";
import FooterText from "components/FooterText";

enum Forms {
  START_A_PROJECT = "START_A_PROJECT",
  SAY_HELLO = "SAY_HELLO"
}

type FormTypes = keyof typeof Forms;

const initialState = {
  name: "",
  email: "",
  company: "",
  project: "",
  hello: "",
  birthday: ""
};

const fadeConfig: TransitionProps["config"] = {
  duration: 200,
  timing: [0.28, 1, 0.5, 1]
};

const fadeInProps: TransitionProps = {
  from: { opacity: 0 },
  to: { opacity: 1 },
  config: fadeConfig
};

const fadeOutProps: TransitionProps = {
  from: { opacity: 0.5 },
  to: { opacity: 0 },
  config: fadeConfig
};

const longFadeOutProps: TransitionProps = {
  ...fadeOutProps,
  config: { duration: 600, timing: [0.28, 1, 0.5, 1] }
};

const slideInConfig: TransitionProps["config"] = {
  duration: 800,
  delay: 800,
  timing: [0.73, 0.35, 0.2, 0.92]
};

const Contact = (): JSX.Element => {
  const [activeForm, setActiveForm] = useState<FormTypes>(null);
  const [form, updateForm] = useForm(initialState);
  const [hiddenArrow, setHiddenArrow] = useState<"left" | "right">(null);

  const leftLabel = useRef(null);
  const rightLabel = useRef(null);
  const mask = useRef(null);
  const image = useRef(null);
  const separator = useRef(null);

  const slideInLeftLabel = useTransition(leftLabel, {
    from: { transform: "translateX(0)" },
    to: { transform: "translateX(10%)" },
    config: slideInConfig
  });

  const slideInRightLabel = useTransition(rightLabel, {
    from: { transform: "translateX(0)" },
    to: { transform: "translateX(-10%)" },
    config: slideInConfig
  });

  const slideInMask = useTransition(mask, {
    from: { transform: "translatex(-100%)" },
    to: { transform: "translateX(0)" },
    config: slideInConfig
  });

  const moveImage = useTransition(image, {
    from: { transform: "translateX(0)" },
    to: { transform: "translateX(-5%)" },
    config: slideInConfig
  });

  const reduceSeparator = useTransition(separator, {
    from: { transform: "scaleX(1)" },
    to: { transform: "scaleX(0)" },
    config: {
      duration: 900,
      timing: [0.53, 0.15, 0.2, 0.92]
    }
  });

  const fadeOutLeftLabel = useTransition(leftLabel, fadeOutProps);
  const fadeOutRightLabel = useTransition(rightLabel, fadeOutProps);
  const longFadeOutLeftLabel = useTransition(leftLabel, longFadeOutProps);
  const longFadeOutRightLabel = useTransition(rightLabel, longFadeOutProps);

  const fadeOutAll = (longFadeOut: () => void, formType: FormTypes): void => {
    slideInMask();
    moveImage();
    reduceSeparator();
    setTimeout(() => longFadeOut(), 1000);
    setTimeout(() => setActiveForm(formType), 1600);
  };

  const startAProject = (): void => {
    setHiddenArrow("left");
    fadeOutRightLabel();
    slideInLeftLabel();
    fadeOutAll(longFadeOutLeftLabel, Forms.START_A_PROJECT);
  };

  const sayHello = (): void => {
    setHiddenArrow("right");
    fadeOutLeftLabel();
    slideInRightLabel();
    fadeOutAll(longFadeOutRightLabel, Forms.SAY_HELLO);
  };

  const slideLeft = useTransition(leftLabel, {
    from: { transform: "translateX(10%)" },
    to: { transform: "translateX(0)" },
    config: {
      duration: 800,
      timing: [0.73, 0.35, 0.2, 0.92]
    }
  });

  const slideRight = useTransition(rightLabel, {
    from: { transform: "translateX(-10%)" },
    to: { transform: "translateX(0)" },
    config: {
      duration: 800,
      timing: [0.73, 0.35, 0.2, 0.92]
    }
  });

  const fadeInLeftLabel = useTransition(leftLabel, fadeInProps);
  const fadeInRightLabel = useTransition(rightLabel, fadeInProps);

  const revealImage = useTransition(mask, {
    from: { transform: "translatex(0)" },
    to: { transform: "translateX(-100%)" },
    config: {
      duration: 800,
      timing: [0.73, 0.35, 0.2, 0.92]
    }
  });

  useEffect((): void => {
    slideLeft();
    fadeInLeftLabel();
    slideRight();
    fadeInRightLabel();
    revealImage();
  }, []);

  return (
    <div className="contact">
      <div className={classList(["contact-image", { "-hide": !!activeForm }])}>
        <div className="contact-image-mask" ref={mask} />
        <img
          src={
            "https://alfacharlie.b-cdn.net/wp-content/uploads/2019/" +
            "05/Alfa-Charlie-Design-Agency-Contact-4.jpg"
          }
          ref={image}
        />
      </div>
      <div className={classList(["contact-labels", { "-hide": !!activeForm }])}>
        <div
          className="contact-label-left"
          onClick={startAProject}
          style={{ transform: "translateX(10%)", opacity: 0 }}
          ref={leftLabel}
        >
          <div className="contact-label">
            <h2 className="label-title">
              <span
                className={classList([
                  "label-arrow",
                  { "-hide": hiddenArrow === "left" }
                ])}
              >
                <Arrow />
              </span>
              <span>start a project</span>
            </h2>
          </div>
        </div>
        <div className="contact-label-separator" ref={separator} />
        <div
          className="contact-label-right"
          onClick={sayHello}
          style={{ transform: "translateX(-10%)", opacity: 0 }}
          ref={rightLabel}
        >
          <div className="contact-label">
            <h2 className="label-title">
              <span>say hello</span>
              <span
                className={classList([
                  "label-arrow",
                  { "-hide": hiddenArrow === "right" }
                ])}
              >
                <Arrow />
              </span>
            </h2>
          </div>
        </div>
      </div>
      <Form
        names={["name", "email", "company", "project", "birthday"]}
        form={form}
        handleInput={updateForm}
        show={activeForm === Forms.START_A_PROJECT}
      />

      <Form
        names={["name", "email", "hello", "birthday"]}
        form={form}
        handleInput={updateForm}
        show={activeForm === Forms.SAY_HELLO}
      />
      <FooterText contact />
    </div>
  );
};

export default Contact;
