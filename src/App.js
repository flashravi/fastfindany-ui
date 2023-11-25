import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddIndividual from "./components/add-individual.component";
import Individual from "./components/individual.component";
import IndividualsList from "./components/individuals-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/individuals" className="navbar-brand">
            FastFindAny
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/individuals"} className="nav-link">
                Individuals
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<IndividualsList/>} />
            <Route path="/individuals" element={<IndividualsList/>} />
            <Route path="/add" element={<AddIndividual/>} />
            <Route path="/individuals/:id" element={<Individual/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;