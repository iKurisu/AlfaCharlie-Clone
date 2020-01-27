import React, { useContext, useRef, useEffect } from "react";
import { ScrollContext } from "../App";
import "./FooterArt.scss";

const FooterArt = (): JSX.Element => {
  const cover = useRef(null);
  const m = useRef(null);
  const rows = [useRef(null), useRef(null), useRef(null)];

  const {
    subscriber: [subscribe, unsubscribe]
  } = useContext(ScrollContext);

  const scaleCover = (scroll: number, max: number): void => {
    const { innerHeight: height } = window;

    if (scroll > max + height / 2) return;

    const scaleY = (2 * (scroll - max)) / height;
    cover.current.style.transform = `scale(1, ${scaleY})`;

    const transform = `translateY(${scaleY * 100}%)`;
    m.current.style.transform = transform;
    rows.forEach(row => (row.current.style.transform = transform));
  };

  useEffect((): (() => void) => {
    subscribe(scaleCover);
    return () => unsubscribe(scaleCover);
  });

  return (
    <div className="footer-art">
      <div className="footer-art-cover" ref={cover} />
      <div
        className="footer-m"
        ref={m}
        style={{ transform: "translateY(100%)" }}
      >
        <span className="footer-m-left" />
        <span className="footer-m-right" />
      </div>
      <div className="footer-rows">
        <span
          className="footer-rows-left"
          ref={rows[0]}
          style={{ transform: "translateY(100%)" }}
        />
        <span
          className="footer-rows-center"
          ref={rows[1]}
          style={{ transform: "translateY(100%)" }}
        />
        <span
          className="footer-rows-right"
          ref={rows[2]}
          style={{ transform: "translateY(100%)" }}
        />
      </div>
    </div>
  );
};

export default FooterArt;
