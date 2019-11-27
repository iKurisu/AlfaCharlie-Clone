import React from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import Link from "../Link";
import { classList } from "utils/class";
import "./Slider.scss";

export interface Author {
  name: string;
  position: string;
}

interface Testimonial {
  paragraphs: string[];
  author: Author;
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
    }
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
    }
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
    }
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
    }
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
    }
  }
];

interface MappedState {
  activeSlide: number;
}

export const Slider = ({ activeSlide }: MappedState): JSX.Element => (
  <div className="testimonials-slider">
    {testimonials.map(({ paragraphs, author }, id) => (
      <div
        className={classList({
          ["testimonials-slide"]: true,
          active: id === activeSlide
        })}
        key={id}
      >
        <div className="testimonial">
          {paragraphs.map((paragraph, id) => (
            <p key={id}>{paragraph}</p>
          ))}
        </div>
        <div className="testimonial-author">
          <Link content={author} />
        </div>
      </div>
    ))}
  </div>
);

const mapState = ({ testimonials }: AppState): MappedState => ({
  activeSlide: testimonials.currentSlideID
});

export default connect(mapState)(Slider);
