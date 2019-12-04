import React, { useEffect } from "react";
import Brief from "./agency/Brief";
import Info from "./shared/Info";

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
      <div className="separator" />
      <div className="row">
        <Info
          header="what we do"
          image={
            "https://alfacharlie.b-cdn.net/wp-content/uploads/" +
            "2019/06/alfa-charlie-agency.jpg"
          }
          title="Strategy-led design with a fresh approach."
          text={
            "We believe design should be meaningful. We aim to " +
            "quiet the noise through a classic, clean aesthetic that " +
            "allows your brand to emerge defined, not decorated — " +
            "strengthening the relationship between client and customer."
          }
          link={false}
          align={"left"}
        />
      </div>
    </React.Fragment>
  );
};

export default Agency;
