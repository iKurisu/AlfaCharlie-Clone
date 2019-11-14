import { createStore, combineReducers } from "redux";
import menu from "modules/menu";
import hero from "modules/hero";

const rootReducer = combineReducers({
  menu,
  hero
});

const store = createStore(rootReducer);

export type AppState = ReturnType<typeof rootReducer>;

export default store;
