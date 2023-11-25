import React, { Component } from "react";
import IndividualDataService from "../services/individual.service";
import { Link } from "react-router-dom";

export default class IndividualsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveIndividuals = this.retrieveIndividuals.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveIndividual = this.setActiveIndividual.bind(this);
    this.removeAllIndividuals = this.removeAllIndividuals.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      individuals: [],
      currentIndividual: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveIndividuals();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveIndividuals() {
    IndividualDataService.getAll()
      .then(response => {
        this.setState({
          individuals: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveIndividuals();
    this.setState({
      currentIndividual: null,
      currentIndex: -1
    });
  }

  setActiveIndividual(individual, index) {
    this.setState({
      currentIndividual: individual,
      currentIndex: index
    });
  }

  removeAllIndividuals() {
    IndividualDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    this.setState({
      currentIndividual: null,
      currentIndex: -1
    });

    IndividualDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          individuals: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, individuals, currentIndividual, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Individuals List</h4>
          <p>Click on an individual to view their details</p>
          <ul className="list-group">
            {individuals &&
              individuals.map((individual, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveIndividual(individual, index)}
                  key={index}
                >
                  {individual.name}
                </li>
              ))}
          </ul>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllIndividuals} disabled
          > Remove All 
          </button>
        </div>
        <div className="col-md-6">
          {currentIndividual ? (
            <div>
              <h4>Individual</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentIndividual.name}
              </div>
              <div>
                <label>
                  <strong>Occupation:</strong>
                </label>{" "}
                {currentIndividual.occupation}
              </div>
              <div>
                <label>
                  <strong>ZipCode:</strong>
                </label>{" "}
                {currentIndividual.zipcode}
              </div>
             <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentIndividual.published ? "Published" : "Pending"}
              </div>
              <Link
                to={"/individuals/" + currentIndividual.id}
                className="badge bg-dark"
              >Edit</Link>
            </div>
          ) : (
            <div>
              <br />
              {/*<p>Please click on a Individual...</p>*/}
            </div>
          )}
        </div>
      </div>
    );
  }
}
