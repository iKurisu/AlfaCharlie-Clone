import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import menu from "modules/menu";
import hero from "modules/hero";

const rootReducer = combineReducers({
  menu,
  hero
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware)
);

export type AppState = ReturnType<typeof rootReducer>;

export default store;
