import { JSDOM } from "jsdom";

interface Global {
  window: Window;
  document: Document;
  navigator: Navigator;
  requestAnimationFrame(cb: () => void): NodeJS.Timeout;
  cancelAnimationFrame(id: number): void;
}

declare const global: Global;

const jsdom: JSDOM = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;

const copyProps = (src: Window, target: Global): void => {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target)
  });
};

global.window = window;
global.document = window.document;

global.requestAnimationFrame = (cb): NodeJS.Timeout => setTimeout(cb, 0);
global.cancelAnimationFrame = (id): void => clearTimeout(id);

copyProps(window, global);
