import { createStore, combineReducers } from "redux";
import hero from "modules/hero";
import intro from "modules/intro";
import menu from "modules/menu";
import testimonials from "modules/testimonials";

const rootReducer = combineReducers({
  hero,
  intro,
  menu,
  testimonials
});

const store = createStore(rootReducer);

export type AppState = ReturnType<typeof rootReducer>;

export default store;
