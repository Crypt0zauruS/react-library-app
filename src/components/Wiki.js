import React, { useState, useEffect, useContext } from "react";
import { LangContext } from "../LangProvider";
import axios from "axios";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FlipMove from "react-flip-move";
import wikimage from "../image/wikipedia.png";

function Wiki() {
  const { langState, english, french } = useContext(LangContext);
  const [lang] = langState;
  const langEn = english;
  const langFr = french;
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const langChoice = lang ? langFr : langEn;

  const baseUrl = `https://${langChoice.languageWiki}.wikipedia.org/w/api.php?action=query&format=json&exintro&explaintext`;

  useEffect(() => {
    setResults([]);
  }, [lang]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.length > 0) {
      mediaWikiSearch(searchTerm);
      setSearchTerm("");
    }
  };

  const handleRandom = () => {
    setSearchTerm("");
    setResults([]);
    setLoading(true);
    axios
      .get(
        `${baseUrl}&generator=random&grnnamespace=0&prop=extracts&exchars=500&origin=*`
      )
      .then((response) => {
        setLoading(false);
        setResults([
          response.data.query.pages[Object.keys(response.data.query.pages)],
        ]);
      })
      .catch(() => {
        console.log("error");
      });
  };

  const mediaWikiSearch = (searchTerm) => {
    setResults([]);
    setLoading(true);
    const url = `${baseUrl}&list=search&utf8=1&srsearch=${searchTerm}&origin=*`;

    axios
      .get(url)
      .then((response) => {
        setLoading(false);
        response.data.query.search.length > 0
          ? setResults(response.data.query.search)
          : setResults([langChoice.noResultsWiki]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <div className="container wiki-container">
        <img className="logo" src={wikimage} alt="wikipedia logo" />
        <div>
          <h1
            className="text-center display-4 wiki fs-1"
            style={{ margin: "20px" }}
          >
            <i className="fa-brands fa-wikipedia-w"></i>
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div
            className="input-group mb-3 mx-auto row"
            style={{ width: "60%" }}
          >
            <div className="col-sm-12 col-md-6">
              <input
                style={{
                  fontSize: "1em",
                  minWidth: "200px",
                  marginBottom: "5px",
                }}
                className="form-control"
                type="text"
                placeholder={langChoice.placeholderWiki}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                autoFocus
                required
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <button
                style={{ width: "100%", fontSize: "1em" }}
                className="btn btn-outline-secondary"
                type="submit"
              >
                {langChoice.searchWiki}
              </button>
            </div>
          </div>
        </form>
        <div className="row">
          <div className="col">
            <button
              style={{ maxWidth: "150px", fontSize: "1em" }}
              className="btn btn-outline-secondary"
              onClick={handleRandom}
              type="button"
            >
              {langChoice.randomWiki}
            </button>

            <button
              style={{ minWidth: "90px", fontSize: "1em" }}
              className="btn btn-outline-secondary ms-5"
              onClick={() => setResults([])}
              type="button"
            >
              {langChoice.clear}
            </button>
          </div>
        </div>
        <div id="articles">
          {loading && (
            <div>
              <hr />
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
              <hr />
            </div>
          )}

          {!loading && results.length > 0 && (
            <div>
              <hr />
              <h3>{langChoice.resultsWiki}</h3>
              <hr />
            </div>
          )}

          <ul className="list-group">
            <FlipMove>
              {results.map((result, index) => {
                const url = result.pageid
                  ? `https://${langChoice.languageWiki}.wikipedia.org/w/index.php?curid=${result.pageid}`
                  : null;
                return (
                  <li className="list-group-item bg-light" key={index}>
                    <h5>{result.title ? result.title : results[0]}</h5>
                    {result.snippet ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: result.snippet }}
                      />
                    ) : (
                      <div> {result.extract && result.extract} </div>
                    )}
                    <a
                      className="link-success text-decoration-none"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {result.title && langChoice.moreWiki}{" "}
                      {result.title && result.title}
                    </a>
                  </li>
                );
              })}
            </FlipMove>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Wiki;
