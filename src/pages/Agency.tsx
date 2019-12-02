import React, { useEffect } from "react";
import Brief from "./agency/Brief";

const Agency = (): JSX.Element => {
  useEffect((): void => {
    document.title =
      "Branding, Web Design and Graphic Design | Alpha Charlie | What We Do";
  });

  return (
    <React.Fragment>
      <div className="row">
        <Brief />
      </div>
    </React.Fragment>
  );
};

export default Agency;
