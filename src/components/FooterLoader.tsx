import React from "react";
import { connect } from "react-redux";
import { AppState } from "store";
import { classList } from "utils/class";
import "./FooterLoader.scss";

interface MappedState {
  toggled: boolean;
}

type Props = MappedState;

const FooterLoader = ({ toggled }: Props): JSX.Element => {
  return (
    <div className={classList(["footer-loader", { "-show": toggled }])}>
      <h3>Let’s work together.</h3>
    </div>
  );
};

const mapState = ({ loader }: AppState): MappedState => ({
  toggled: loader.footer
});

export default connect(mapState)(FooterLoader);
