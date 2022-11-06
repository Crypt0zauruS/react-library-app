import {
  FETCH_BOOKS_ERROR,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_LOADING,
  FETCH_BOOKS_CLEAR,
} from "../constants";
import axios from "axios";

const fetchbooksLoading = () => {
  return {
    type: FETCH_BOOKS_LOADING,
  };
};

export const fetchbooksClear = () => {
  return {
    type: FETCH_BOOKS_CLEAR,
  };
};

const fetchbooksSuccess = (data) => {
  return {
    type: FETCH_BOOKS_SUCCESS,
    payload: data,
  };
};

const GOOGLE_API_KEY = "AIzaSyB8A_KKKLg0-9wxdd_u8V08R2Mbzynl8IQ";

const fetchbooksError = (error) => {
  return {
    type: FETCH_BOOKS_ERROR,
    payload: error,
  };
};

// special action fetchbooks for redux-thunk because asynchronous
export const fetchBooks = (title) => {
  // dispatch of all actions defined previously
  return (dispatch) => {
    dispatch(fetchbooksLoading());
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${GOOGLE_API_KEY}&maxResults=20`
      )
      .then((res) => {
        const bookItemsArray = res.data.items;
        dispatch(fetchbooksSuccess(bookItemsArray));
      })
      .catch((error) => {
        dispatch(fetchbooksError(error.message));
      });
  };
};
