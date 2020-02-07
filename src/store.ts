import { createStore, combineReducers } from "redux";
import hero from "modules/hero";
import intro from "modules/intro";
import menu from "modules/menu";
import navigation from "modules/navigation";
import testimonials from "modules/testimonials";
import work from "modules/work";
import cursor from "modules/cursor";
import loader from "modules/loader";
import agency from "modules/agency";

const rootReducer = combineReducers({
  hero,
  intro,
  menu,
  navigation,
  testimonials,
  work,
  cursor,
  loader,
  agency
});

const store = createStore(rootReducer);

export type AppState = ReturnType<typeof rootReducer>;

export default store;
