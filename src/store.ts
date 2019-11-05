import { createStore, combineReducers } from "redux";
import menu from "modules/menu";

const rootReducer = combineReducers({
  menu
});
const store = createStore(rootReducer);

export type AppState = ReturnType<typeof rootReducer>;

export default store;
