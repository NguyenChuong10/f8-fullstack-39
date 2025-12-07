import { legacy_createStore } from "redux";
import todoReducer from "./reducer"

const store = legacy_createStore(todoReducer);

export default store;