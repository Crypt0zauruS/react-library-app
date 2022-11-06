import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks, fetchbooksClear } from "../redux/actions/actionFetchBooks";
import { addBook } from "../redux/actions/actionAddBooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useLocation } from "react-router-dom";
import { LangContext } from "../LangProvider";

const SearchBooks = () => {
  const { langState, english, french } = useContext(LangContext);
  const [lang] = langState;
  const langEn = english;
  const langFr = french;

  const langChoice = lang ? langFr : langEn;

  const location = useLocation();

  const [title, setTitle] = useState("");

  const state = useSelector((state) => state.search);

  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state !== null) {
      dispatch(fetchBooks(location.state.state));
      setTitle(location.state.state);
    }
  }, [dispatch, location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchBooks(title));
  };

  const clearBooks = () => {
    dispatch(fetchbooksClear());
    setTitle("");
  };

  const confirmAddBook = (title, author, link) => {
    const bookToSave = {
      title,
      author,
      link,
    };

    dispatch(addBook(bookToSave));

    toast.success(`${langChoice.success}`, {
      className: "toast-position",
      theme: "dark",
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  const handleSave = (title, author, link) => {
    const checkBook = JSON.parse(localStorage.getItem("booksData")).filter(
      (book) => book.title === title
    );
    if (checkBook.length > 0) {
      confirmAlert({
        title: "",
        message: `${langChoice.alert}`,
        buttons: [
          {
            label: `${langChoice.sure}`,
            onClick: () => confirmAddBook(title, author, link),
          },
          {
            label: `${langChoice.cancel}`,
          },
        ],
      });
    } else {
      confirmAddBook(title, author, link);
    }
  };

  const displayDefault =
    state.fetchedBooks.length === 0 ? (
      <p
        className="text-center fs-4"
        style={{ fontFamily: "serif", marginTop: "20%", color: " #463e3d " }}
      >
        “{langChoice.quoteSearch}”
        <br /> Marcus Aurelius
      </p>
    ) : null;
  const displayFetchedBooks = state.isLoading ? (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-info" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  ) : state.error !== "" ? (
    <p>{state.error}</p>
  ) : (
    state.fetchedBooks.map((data, index) => {
      //console.log(data);
      return (
        <div className="accordion-item" key={data.id}>
          <h2 className="accordion-header" id={`flush-heading${index}`}>
            <button
              className="accordion-button bg-light text-dark collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#flush-collapse${index}`}
              aria-expanded="true"
              aria-controls={`flush-collapse${index}`}
            >
              {data.volumeInfo.title}
            </button>
          </h2>
          <div
            id={`flush-collapse${index}`}
            className="accordion-collapse collapse "
            aria-labelledby={`flush-heading${index}`}
            data-bs-parent="#accordionBook"
          >
            <div className="accordion-body">
              <div className="bg-light">
                {data.volumeInfo.imageLinks ? (
                  <img
                    className="ps-3 pt-3 mb-3"
                    src={data.volumeInfo.imageLinks.thumbnail}
                    alt={data.volumeInfo.title}
                  />
                ) : null}

                <h4 className="display-7 px-3 fs-6">
                  {langChoice.title}: {data.volumeInfo.title}
                </h4>
                <h5 className="px-3 fs-6">
                  {langChoice.author}: {data.volumeInfo.authors}
                </h5>

                {data.volumeInfo.description ? (
                  <p className="px-3 fs-6">{data.volumeInfo.description}</p>
                ) : (
                  <p className="px-3">{langChoice.nodesc}</p>
                )}

                <a
                  className="btn btn-outline-secondary mx-3 mb-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data.volumeInfo.previewLink}
                >
                  {langChoice.more}
                </a>
                <button
                  className="btn btn-outline-secondary ms-3 mb-3"
                  onClick={() =>
                    handleSave(
                      data.volumeInfo.title,
                      data.volumeInfo.authors,
                      data.volumeInfo.previewLink
                    )
                  }
                >
                  {langChoice.save}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    })
  );

  return (
    <main role="main" style={{ marginTop: "-16px" }}>
      <ToastContainer />

      <div className="m-3 bg-light pb-5" style={{ position: "relative" }}>
        <div className="container text-center">
          <h1 className="display-4" style={{ color: " #463e3d " }}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </h1>

          <form className="justify-content-center" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <input
                  autoFocus
                  value={title}
                  type="text"
                  className="form-control"
                  placeholder={langChoice.placeholder}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="col">
                <button type="submit" className="btn btn-outline-secondary">
                  {langChoice.search}
                </button>
              </div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={clearBooks}
                >
                  {langChoice.clear}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        className="container"
        style={{ minHeight: "200px", marginTop: "30px", position: "relative" }}
      >
        <div
          className="accordion accordion-flush"
          id="accordionBook"
          style={{ paddingBottom: "100px" }}
        >
          {displayDefault}
          {displayFetchedBooks}
        </div>
      </div>
    </main>
  );
};

export default SearchBooks;
