import React from "react";
import { LangProvider } from "./LangProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import AddBooks from "./containers/AddBooks";
import SearchBooks from "./containers/SearchBooks";
import Wiki from "./components/Wiki";

function App() {
  return (
    <LangProvider>
      <div className="App">
        <Router>
          <NavBar />

          <Routes>
            <Route path="/" element={<AddBooks />} />
            <Route path="/search" element={<SearchBooks />} />
            <Route path="/wiki" element={<Wiki />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </LangProvider>
  );
}

export default App;
