import authReducer from "./auth/auth-slice";
import bookReducer from "./book/book-slice";

const { combineReducers } = require("@reduxjs/toolkit");

export const reducer = combineReducers({
  auth: authReducer,
  book: bookReducer,
});
