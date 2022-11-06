import { ADD_BOOKS, DELETE_BOOK, DELETE_ALL_BOOKS } from "../constants";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  books: [],
};

const helperAddData = (action) => {
  return {
    id: uuidv4(),
    title: action.payload.title,
    author: action.payload.author,
    link: action.payload.link,
  };
};

const removeDataById = (state, id) => {
  const books = state.filter((book) => book.id !== id);
  return books;
};

// reducer

const reducerAddBooks = (state = initialState.books, action) => {
  if (localStorage.getItem("booksData")) {
    state = JSON.parse(localStorage.getItem("booksData"));
  } else {
    localStorage.setItem("booksData", JSON.stringify([]));
  }

  switch (action.type) {
    case ADD_BOOKS:
      state = [...state, helperAddData(action)];
      localStorage.setItem("booksData", JSON.stringify(state));
      return state;

    case DELETE_BOOK:
      state = removeDataById(state, action.payload);
      localStorage.setItem("booksData", JSON.stringify(state));
      return state;

    case DELETE_ALL_BOOKS:
      state = []; // le state devient un array vide
      localStorage.setItem("booksData", JSON.stringify(state));
      return state;

    default:
      return state;
  }
};
// note: here, it's not an useState , but a state as parameter of reducerAddBooks,
// on which default is an empty array
export default reducerAddBooks;
