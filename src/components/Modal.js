import React, { useState, useContext } from "react";
import { LangContext } from "../LangProvider";

const Modal = ({ onChange }) => {
  const [login, setLogin] = useState("");
  const { langState, english, french } = useContext(LangContext);
  const [lang, setLang] = langState;
  const langEn = english;
  const langFr = french;

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify([login]));
    onChange(false);
  };
  const langChoice = lang ? langFr : langEn;
  return (
    <div>
      {" "}
      <div className="container dialog-box">
        <div
          id="loginbox"
          className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"
        >
          <div className="panel panel-info">
            <div className="panel-heading">
              <div className="panel-title">
                <h3
                  className="mb-5 pt-4"
                  style={{
                    fontFamily: "serif",
                    marginLeft: "250px",
                    marginRight: "10px",
                    fontStyle: "italic",
                  }}
                >
                  {!localStorage.getItem("userData")
                    ? langChoice.pseudo
                    : langChoice.pseudoChange}
                </h3>
                <button
                  className="btn btn-light lang"
                  onClick={() => setLang(!lang)}
                  type="button"
                  style={{ float: "right", marginRight: "20px" }}
                >
                  {langChoice.buttonNav}
                </button>
              </div>
            </div>

            <div style={{ paddingTop: "100px" }} className="panel-body">
              <form
                id="loginform"
                className="form-horizontal"
                onSubmit={handleSubmit}
              >
                <div
                  style={{ marginBottom: "25px" }}
                  className="input-group d-flex justify-content-center"
                >
                  <input
                    style={{ maxWidth: "300px" }}
                    onChange={(e) => setLogin(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Pseudo"
                    autoFocus
                    required
                  />
                </div>

                <div style={{ marginTop: "10px" }} className="form-group">
                  <div className="col-sm-12 controls">
                    <button type="submit" className="btn btn-secondary mx-4">
                      <i className="fa-solid fa-check"></i>
                    </button>{" "}
                    {localStorage.getItem("userData") && (
                      <button
                        type="button"
                        className="btn btn-secondary mx-4"
                        onClick={() => onChange(false)}
                      >
                        <i className="fa-solid fa-ban"></i>
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
