import React, { useState, useContext, useRef, useEffect } from "react";
import { LangContext } from "../LangProvider";
import { confirmAlert } from "react-confirm-alert"; // Import
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({ onChange }) => {
  const [login, setLogin] = useState("");
  const { langState, english, french } = useContext(LangContext);
  const [lang, setLang] = langState;
  const langEn = english;
  const langFr = french;
  const ref = useRef(null);
  const [file, setFile] = useState(undefined);
  const [upload, setUpload] = useState(false);

  const restoreAlert = (file) => {
    confirmAlert({
      title: `${langChoice.restoreAlert}`,
      message: "",
      buttons: [
        {
          label: `${langChoice.sure}`,
          onClick: () => toJsonObject(file),
        },
        {
          label: `${langChoice.cancel}`,
        },
      ],
    });
  };

  function getLocalstorageToFile(fileName) {
    let datas = {};

    for (let i = 0; i < localStorage.length; i++) {
      const keys = localStorage.key(i);
      const values = localStorage.getItem(keys);
      datas[keys] = values;
    }
    const textToSave = JSON.stringify(datas);
    const textToSaveAsBlob = new Blob([textToSave], {
      type: "text/plain",
    });
    const textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    const downloadLink = document.createElement("a");
    downloadLink.download = fileName;
    downloadLink.href = textToSaveAsURL;
    downloadLink.click();
    toast.success(`${langChoice.backup}`, {
      className: "toast-position",
      theme: "dark",
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  }

  function toJsonObject(file) {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function (event) {
      const result = JSON.parse(event.target.result);
      if (result.booksData && result.userData) {
        for (let key in result) {
          localStorage.setItem(key, result[key]);
          window.location.reload();
        }
      } else {
        alert("Wrong file");
      }
    };
    setUpload(true);
  }

  useEffect(() => {
    if (upload) ref.current.value = null;
    setUpload(false);
  }, [upload]);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify([login]));
    onChange(false);
  };
  const langChoice = lang ? langFr : langEn;
  return (
    <div>
      <ToastContainer />{" "}
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
                    : langChoice.settings}
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
                  <div className="row">
                    <div className="col">
                      <input
                        style={{ maxWidth: "300px", minWidth: "250px" }}
                        onChange={(e) => setLogin(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder={
                          !localStorage.getItem("userData")
                            ? langChoice.pseudo
                            : langChoice.pseudoChange
                        }
                        autoFocus
                        required
                      />
                    </div>
                    <div className="col">
                      <button
                        style={{ border: "1px solid darkturquoise" }}
                        type="submit"
                        className="btn btn-secondary"
                      >
                        <i className="fa-solid fa-check"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {localStorage.getItem("userData") && (
                <div style={{ marginTop: "10px" }} className="form-group">
                  <div className="col-sm-12 controls">
                    <hr />
                    <button
                      className="btn btn-primary"
                      onClick={() => getLocalstorageToFile("myLibrary.txt")}
                    >
                      {langChoice.saveLibrary}
                    </button>
                    <hr />
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        file && restoreAlert(file);
                      }}
                    >
                      <button
                        style={{ marginBottom: "10px" }}
                        className="btn btn-danger"
                        type="submit"
                      >
                        {langChoice.restore}
                      </button>
                      <input
                        className="form-control"
                        required
                        type="file"
                        accept="text/plain"
                        ref={ref}
                        style={{
                          maxWidth: "400px",
                          margin: "0 auto",
                        }}
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                        }}
                      />
                    </form>
                    <hr />
                  </div>
                </div>
              )}
            </div>
            {localStorage.getItem("userData") && (
              <button
                type="button"
                className="btn btn-secondary mx-3"
                onClick={() => onChange(false)}
                style={{ border: "1px solid darkturquoise" }}
              >
                {langChoice.closeSettings}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
