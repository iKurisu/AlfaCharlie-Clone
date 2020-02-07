import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import ClickLink from "./ClickLink";
import { ScrollContext } from "../../App";
import { Filters, WorkActionTypes } from "modules/work/types";
import { workActions } from "modules/work";

enum Links {
  ALL = "work/ALL",
  BRANDING = "work/BRANDING",
  DIGITAL = "work/DIGITAL"
}

interface MappedActions {
  setFilter: (filter: Filters) => WorkActionTypes;
}

interface OwnProps {
  show: boolean;
}

type Props = MappedActions & OwnProps;

const WorkLinks = ({ show, setFilter }: Props): JSX.Element => {
  const [activeLink, setActiveLink] = useState(Links.ALL);
  const { manualScroll } = useContext(ScrollContext);

  const filterWithScroll = (
    link: Links,
    filter: Filters
  ): (() => void) => () => {
    setActiveLink(link);
    manualScroll({
      to: 0,
      duration: 600,
      timing: [0.07, 0.4, 0.07, 1]
    });
    setTimeout(() => setFilter(filter), 300);
  };

  return (
    <React.Fragment>
      <li key={0}>
        <ClickLink
          link="All"
          click={filterWithScroll(Links.ALL, "ALL")}
          show={show}
          isActive={activeLink === Links.ALL}
          options={{ order: 0 }}
        />
      </li>
      <li key={1}>
        <ClickLink
          link="Branding"
          click={filterWithScroll(Links.BRANDING, "BRANDING")}
          show={show}
          isActive={activeLink === Links.BRANDING}
          options={{ order: 1 }}
        />
      </li>
      <li key={2}>
        <ClickLink
          link="Digital"
          click={filterWithScroll(Links.DIGITAL, "DIGITAL")}
          show={show}
          isActive={activeLink === Links.DIGITAL}
          options={{ order: 2 }}
        />
      </li>
    </React.Fragment>
  );
};

const mapDispatch = {
  setFilter: workActions.setVisibilityFilter
};

export default connect(null, mapDispatch)(WorkLinks);
