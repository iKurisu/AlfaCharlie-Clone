import React, { useState, useRef, RefObject, useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import Link from "../Link";
import { classList } from "utils/class";
import "./Slider.scss";
import useParallax from "hooks/useParallax";

export interface Author {
  name: string;
  position: string;
}

interface Testimonial {
  paragraphs: string[];
  author: Author;
  link: string;
}

const testimonials: Testimonial[] = [
  {
    paragraphs: [
      "Since we began working with Alfa Charlie, they have elevated our brand " +
        "through creative web and print design projects. Their ability to listen " +
        "to our marketing goals and understand our company has brought on " +
        "extremely satisfying results making us feel like Alfa Charlie is part " +
        "of our team. Not only fun to work with, Alfa Charlie is responsive, " +
        "organized and produces beautiful work."
    ],
    author: {
      name: "Edward Piegza",
      position: "Founder, Classic Journeys"
    },
    link: "https://www.classicjourneys.com/"
  },
  {
    paragraphs: [
      "We get so many compliments on our website! Alfa Charlie did an amazing " +
        "job, they were able to depict our brand and purpose through a fun, " +
        "clean and professional website. If you’re looking for a service that " +
        "will take the extra time to get to know your company personally and " +
        "create a website centered around your brand, goals, and purpose, then " +
        "Alfa Charlie is for you."
    ],
    author: {
      name: "Teal Cooper",
      position: "Founder, Vendibean"
    },
    link: "https://vendibean.com/"
  },
  {
    paragraphs: [
      "Working with Alfa Charlie was a dream! They spent time really getting a " +
        "feel for where I wanted to take my business in the coming years and " +
        "what type of client I wanted to attract.",
      "And the result was stunning! I look at my website every day and think " +
        "about how it reflects my style, ideal client, and business goals perfectly!"
    ],
    author: {
      name: "Kristina Doherty",
      position: "Founder, Kristina Kay Photography"
    },
    link: "https://www.kristinakayphotography.com/"
  },
  {
    paragraphs: [
      "A head and shoulders above others, Alfa Charlie is a leading design " +
        "agency. As the owner of a growing communications firm, I need to " +
        "partner with teams that are quick, reliable and creative. On every " +
        "project, Alfa Charlie has delivered an exceptional product and " +
        "service for our clients that we’ve all been very proud of."
    ],
    author: {
      name: "Charles Chamberlayne",
      position: "Principal, Chamberlaynepr"
    },
    link: "http://chamberlaynepr.com/"
  },
  {
    paragraphs: [
      "The creative process with Kim and Reva was both interactive and fun, " +
        "and the quality of their work is second to none. I couldn’t be happier " +
        "with the outcome. Having a website and brand that stands out from my " +
        "competition and represents my personality has really given me great " +
        "confidence in a time that would otherwise have been daunting. I highly " +
        "recommend their services."
    ],
    author: {
      name: "Jono Green",
      position: "Founder, GRX Baseball"
    },
    link: "https://grxbaseball.com/"
  }
];

interface MappedState {
  activeSlide: number;
}

export const Slider = ({ activeSlide }: MappedState): JSX.Element => {
  const [height, setHeight] = useState(0);

  const refs: RefObject<HTMLDivElement>[] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const updateHeight = (): void =>
    setHeight(
      Math.max(
        ...refs.map((ref): number =>
          ref.current ? ref.current.clientHeight : 0
        )
      )
    );

  useEffect((): (() => void) => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const sliderParallax = useRef(null);
  useParallax(sliderParallax, { min: 35, max: -21, unit: "px" });

  return (
    <div
      className="testimonials-slider"
      style={{ height: `${height}px`, transform: "translateY(35px)" }}
      ref={sliderParallax}
    >
      {testimonials.map(({ paragraphs, author, link }, id) => (
        <div
          className={classList([
            "testimonials-slide",
            { active: id === activeSlide }
          ])}
          ref={refs[id]}
          key={id}
        >
          <div className="testimonial">
            {paragraphs.map((paragraph, id) => (
              <p key={id}>{paragraph}</p>
            ))}
          </div>
          <div className="testimonial-author">
            <Link content={author} to={link} />
          </div>
        </div>
      ))}
    </div>
  );
};

const mapState = ({ testimonials }: AppState): MappedState => ({
  activeSlide: testimonials.currentSlideID
});

export default connect(mapState)(Slider);
