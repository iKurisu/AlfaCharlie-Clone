import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import Link from "pages/shared/Link";
import Mask from "components/slider/Mask";
import "./Brief.scss";
import useTransition from "hooks/useTransition";
import { ease } from "utils/timings";

interface MappedState {
  reveal: boolean;
}

type Props = MappedState;

const Brief = ({ reveal }: Props): JSX.Element => {
  const image = useRef(null);
  const slideImageToLeft = useTransition(image, {
    from: { transform: "translateX(30px) scaleX(1.1)" },
    to: { transform: "translateX(0) scaleX(1)" },
    config: {
      duration: 850,
      timing: ease
    }
  });

  const fadeIn = (
    ref: React.RefObject<HTMLDivElement>,
    delay: number = 0
  ): (() => Promise<void>) =>
    useTransition(ref, {
      from: { transform: `translateX(40px)`, opacity: 0 },
      to: { transform: `translateX(0)`, opacity: 1 },
      config: {
        duration: 500,
        timing: ease,
        delay
      }
    });

  const title = useRef(null);
  const text = useRef(null);
  const link = useRef(null);

  const fadeInTitle = fadeIn(title);
  const fadeInText = fadeIn(text, 200);
  const fadeInLink = fadeIn(link, 350);

  const fadeInContent = (): Promise<void[]> =>
    Promise.all([fadeInTitle(), fadeInText(), fadeInLink()]);

  useEffect((): void => {
    if (reveal) {
      slideImageToLeft();
      fadeInContent();
    }
  }, [reveal]);

  return (
    <section className="brief">
      <div className="brief-content">
        <div className="brief-animation" ref={title}>
          <h3 className="brief-title">
            Alfa Charlie is a boutique creative agency based in San Diego, CA.
          </h3>
        </div>
        <div className="brief-animation" ref={text}>
          <p className="brief-text">
            The nautical flags, Alfa Charlie, are code to abandon ship. For us,
            they’re a signal to defy convention, start fresh, and seek new
            territory, together.
          </p>
        </div>
        <div className="brief-animation" ref={link}>
          <Link content="Get in touch" to="/contact" />
        </div>
      </div>
      <div className="brief-image-wrapper">
        <div className="brief-image">
          <Mask isOpen={reveal} options={{ fadeDirection: "left", delay: 0 }} />
          <img
            src="https://alfacharlie.b-cdn.net/wp-content/uploads/2019/05/Alfa-Charlie-Creative-Agency-6.jpg"
            ref={image}
          />
        </div>
      </div>
    </section>
  );
};

const mapState = ({ intro, loader }: AppState): MappedState => ({
  reveal: !(intro.toggled || loader.main)
});

export default connect(mapState)(Brief);
