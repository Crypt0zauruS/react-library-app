import React, { useState, useContext } from "react";
import { connect } from "react-redux";
import { LangContext } from "../LangProvider";
import {
  addBook,
  deleteBook,
  deleteAllBooks,
} from "../redux/actions/actionAddBooks";
import FlipMove from "react-flip-move";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Link } from "react-router-dom";

const AddBooks = ({ libraryData, addBook, deleteBook, deleteAll }) => {
  const { langState, english, french } = useContext(LangContext);
  const [lang] = langState;
  const langEn = english;
  const langFr = french;
  const langChoice = lang ? langFr : langEn;

  const initialState = {
    title: "",
    author: "",
    link: "",
  };
  const [newData, setNewData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkBook = JSON.parse(localStorage.getItem("booksData")).filter(
      (book) => book.title === newData.title
    );

    if (checkBook.length > 0) {
      confirmAlert({
        title: "",
        message: `${langChoice.alert}`,
        buttons: [
          {
            label: `${langChoice.sure}`,
            onClick: () => {
              addBook(newData);
              setNewData(initialState);
            },
          },
          {
            label: `${langChoice.cancel}`,
            onClick: () => setNewData(initialState),
          },
        ],
      });
    } else {
      addBook(newData);
      // flush input
      setNewData(initialState);
    }
  };

  const deleteAllAlert = () => {
    confirmAlert({
      title: `${langChoice.askAdd}`,
      message: "",
      buttons: [
        {
          label: `${langChoice.sure}`,
          onClick: () => deleteAll(),
        },
        {
          label: `${langChoice.cancel}`,
        },
      ],
    });
  };

  const displayData =
    libraryData.length > 0 ? (
      <FlipMove>
        {libraryData.map((data) => {
          return (
            <li
              key={data.id}
              className="list-group-item list-group-item-light d-flex justify-content-between"
            >
              <span>
                <strong>{langChoice.title}: </strong>{" "}
                {data.link ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={data.link}
                    style={{ color: "#463e3d" }}
                  >
                    {data.title}
                  </a>
                ) : (
                  <Link
                    to={"/search"}
                    state={{ state: data.title }}
                    style={{ color: "#463e3d" }}
                  >
                    {data.title}
                  </Link>
                )}
              </span>
              <span>
                <strong>{langChoice.authorAdd}: </strong> {data.author}
              </span>
              <span
                style={{ minHeight: "40px", maxHeight: "40px" }}
                className="btn btn-danger"
                onClick={() => deleteBook(data.id)}
              >
                x
              </span>
            </li>
          );
        })}
      </FlipMove>
    ) : (
      <p
        className="text-center fs-4"
        style={{ fontFamily: "serif", marginTop: "20%", color: " #463e3d " }}
      >
        “{langChoice.quoteAdd}”
        <br /> Marcus Aurelius
      </p>
    );

  const deleteAllBooks = libraryData.length > 1 && (
    <button onClick={deleteAllAlert} className="btn btn-danger mt-3">
      {langChoice.deleteAdd}
    </button>
  );

  return (
    <main role="main" style={{ marginTop: "-16px" }}>
      <div className="m-3 bg-light pb-5" style={{ position: "relative" }}>
        <div className="container text-center add-form">
          <h1 className="display-5" style={{ color: " #463e3d " }}>
            <i className="fa-solid fa-book"></i>
          </h1>

          <form className="justify-content-center" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <p
                  className="fs-5 mt-1 add-library"
                  style={{ fontFamily: "serif" }}
                >
                  {langChoice.addAdd}
                </p>
              </div>
              <div className="col-sm-12 col-md-4 add-input">
                <input
                  value={newData.title}
                  type="text"
                  className="form-control"
                  placeholder={langChoice.title}
                  required
                  onChange={(e) =>
                    setNewData({ ...newData, title: e.target.value })
                  }
                />
              </div>

              <div className="col-sm-12 col-md-4 add-input">
                <input
                  value={newData.author}
                  type="text"
                  className="form-control add-input"
                  placeholder={langChoice.authorAdd}
                  required
                  onChange={(e) =>
                    setNewData({ ...newData, author: e.target.value })
                  }
                />
              </div>
              <div className="col">
                <button className="btn btn-outline-secondary">
                  {langChoice.buttonAdd}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        className="container"
        style={{ minHeight: "200px", marginTop: "30px", position: "relative " }}
      >
        <div className="row">
          <div className="col-md-12">
            <ul className="list-group">{displayData}</ul>
            <div className="d-flex justify-content-center">
              {deleteAllBooks}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    libraryData: state.library,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBook: (data) => dispatch(addBook(data)),
    deleteBook: (id) => dispatch(deleteBook(id)),
    deleteAll: () => dispatch(deleteAllBooks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBooks);
