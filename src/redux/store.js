import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import reducerAddBooks from "./reducers/reducerAddBooks";
import reducerFetchedBooks from "./reducers/reducerFetchBooks";

const rootReducer = combineReducers({
  library: reducerAddBooks,
  search: reducerFetchedBooks,
});
// applyMiddleware allows to add middlewares to our store
// thunk for asynchronous actions of our google books API
// included in configureStore
// const store = createStore(rootReducer, applyMiddleware(thunk));
const store = configureStore({ reducer: rootReducer });
export default store;
