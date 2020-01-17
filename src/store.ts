import { createStore, combineReducers } from "redux";
import hero from "modules/hero";
import intro from "modules/intro";
import menu from "modules/menu";
import navigation from "modules/navigation";
import testimonials from "modules/testimonials";
import work from "modules/work";
import cursor from "modules/cursor";

const rootReducer = combineReducers({
  hero,
  intro,
  menu,
  navigation,
  testimonials,
  work,
  cursor
});

const store = createStore(rootReducer);

export type AppState = ReturnType<typeof rootReducer>;

export default store;
