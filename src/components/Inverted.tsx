import React, { RefObject } from "react";
import Symbol from "./Symbol";
import "./Inverted.scss";

interface Props {
  invertedBackground: RefObject<HTMLDivElement>;
  invertedSymbolContainer: RefObject<HTMLDivElement>;
  symbolMask: RefObject<HTMLDivElement>;
  invertedSymbol: RefObject<SVGSVGElement>;
  invertedTopLine: RefObject<SVGLineElement>;
  invertedBottomLine: RefObject<SVGLineElement>;
  invertedSymbolLetters: RefObject<SVGPathElement>[];
}

const Inverted = ({
  invertedBackground,
  invertedSymbolContainer,
  symbolMask,
  invertedSymbol,
  invertedTopLine,
  invertedBottomLine,
  invertedSymbolLetters
}: Props): JSX.Element => (
  <React.Fragment>
    <div className="inverted-background" ref={invertedBackground} />
    <div className="inverted-symbol" ref={invertedSymbolContainer}>
      <div className="symbol-mask" ref={symbolMask}>
        <div className="symbol-wrapper">
          <Symbol
            symbol={invertedSymbol}
            topLine={invertedTopLine}
            bottomLine={invertedBottomLine}
            letters={invertedSymbolLetters}
          />
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default Inverted;
