import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import menu from "modules/menu";

const rootReducer = combineReducers({
  menu
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware)
);

export type AppState = ReturnType<typeof rootReducer>;

export default store;
