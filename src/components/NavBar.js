import { LangContext } from "../LangProvider";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";

const NavBar = () => {
  const { langState, converter, english, french } = useContext(LangContext);
  const [lang, setLang] = langState;
  const langEn = english;
  const langFr = french;
  const convert = converter;
  const [apiData, setApiData] = useState(null);
  const [modal, setModal] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true); // Nouvel état pour suivre l'unité de température

  const handleCoords = function () {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://weather-proxy.freecodecamp.rocks/api/current?lon=${longitude}&lat=${latitude}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setApiData(data);
          convert(data.weather[0].main);
        })
        .catch((err) => console.log(err));
    });
  };

  const showModal = (bool) => {
    setModal(bool);
  };

  const handleName = () => {
    if (localStorage.getItem("userData")) {
      if (!lang) {
        return JSON.parse(localStorage.getItem("userData")) + "'s Library";
      } else {
        return "Biblio de " + JSON.parse(localStorage.getItem("userData"));
      }
    }
  };

  useEffect(() => {
    !localStorage.getItem("userData") && showModal(true);
    handleCoords();
    // eslint-disable-next-line
  }, []);

  const langChoice = lang ? langFr : langEn;

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const convertTemperature = (temp) => {
    return isCelsius ? temp : (temp * 9) / 5 + 32;
  };

  return (
    <header>
      {modal && <Modal onChange={showModal} />}
      {/* Bar */}

      <div className="p-3 border-bottom bg-secondary text-white navbar">
        <h4 className="mr-md-auto">
          <button
            type="button"
            onClick={showModal}
            className="name text-decoration-none fs-1 btn btn-link"
          >
            {handleName()}
          </button>
          <button
            className="btn btn-light lang"
            onClick={() => setLang(!lang)}
            type="button"
          >
            {langChoice.buttonNav}
          </button>
        </h4>

        {apiData ? (
          <div className="d-flex flex-row weather">
            <p className="h5 mx-3 mt-3">
              <i className="fas fa-map-marker-alt"></i>{" "}
              <strong>{apiData.name}</strong>
            </p>
            <img
              src={apiData.weather[0].icon}
              alt="weather status icon"
              className="weather-icon"
            />
            <p
              className="mx-3"
              onClick={toggleTemperatureUnit}
              style={{ cursor: "pointer" }}
            >
              {convertTemperature(apiData.main.temp).toFixed(2) +
                (isCelsius ? " °C" : " °F")}
              <br />
              <strong>{langChoice.weather}</strong>
            </p>
          </div>
        ) : (
          <div className="text-center weather">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Menu */}
        <nav className="btn-group">
          <Link
            to="/"
            className="btn btn-light fs-5 me-3 rounded"
            style={{ fontFamily: "Serif" }}
          >
            {langChoice.homeNav}
          </Link>
          <Link
            to="/search"
            className="btn btn-light fs-5 me-3 rounded"
            style={{ fontFamily: "Serif" }}
          >
            {langChoice.searchNav}
          </Link>
          <Link
            to="/wiki"
            className="btn btn-light fs-5 me-3 rounded"
            style={{ fontFamily: "Serif" }}
          >
            {langChoice.moreNav}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
