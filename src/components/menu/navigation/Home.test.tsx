import React from "react";
import renderer from "react-test-renderer";
import Home from "./Home";
import { BrowserRouter as Router } from "react-router-dom";

it("renders correctly", (): void => {
  const home = renderer.create(
    <Router>
      <Home isOpen={true} />
    </Router>
  );

  expect(home).toMatchSnapshot();
});
