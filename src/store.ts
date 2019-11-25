import { createStore, combineReducers } from "redux";
import hero from "modules/hero";
import intro from "modules/intro";
import menu from "modules/menu";

const rootReducer = combineReducers({
  hero,
  intro,
  menu
});

const store = createStore(rootReducer);

export type AppState = ReturnType<typeof rootReducer>;

export default store;
