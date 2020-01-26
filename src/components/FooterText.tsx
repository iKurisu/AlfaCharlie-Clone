import React, { RefObject } from "react";
import LoaderLink from "components/LoaderLink";
import "./FooterText.scss";

interface Props {
  left?: RefObject<HTMLSpanElement>;
  center?: RefObject<HTMLSpanElement>;
  right?: RefObject<HTMLSpanElement>;
}

const FooterText = ({ left, center, right }: Props): JSX.Element => (
  <div className="footer-text">
    <span className="footer-left" ref={left}>
      SAN DIEGO, CA
    </span>
    <span className="footer-center" ref={center}>
      <span>© COPYRIGHT ALFA CHARLIE LLC</span>
      <LoaderLink to="/privacy-policy">PRIVACY POLICY</LoaderLink>
    </span>
    <span className="footer-right" ref={right}>
      <a href="mailto:hello@alfacharlie.co">HELLO@ALFACHARLIE.CO</a>
    </span>
  </div>
);

export default FooterText;
