import React, { Component } from "react";
import IndividualDataService from "../services/individual.service";

export default class AddIndividual extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeOccupation = this.onChangeOccupation.bind(this);
    this.onChangeZipCode = this.onChangeZipCode.bind(this);
    this.saveIndividual = this.saveIndividual.bind(this);
    this.newIndividual = this.newIndividual.bind(this);

    this.state = {
      id: null,
      name: "",
      occupation: "", 
      zipcode: "",
      published: false,
      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeOccupation(e) {
    this.setState({
      occupation: e.target.value
    });
  }

  onChangeZipCode(e) {
    this.setState({
      zipcode: e.target.value
    });
  }

  saveIndividual() {
    var data = {
      name: this.state.name,
      occupation: this.state.occupation,
      zipcode: this.state.zipcode,
    };

    IndividualDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          occupation: response.data.occupation,
          zipcode: response.data.zipcode,
          published: true,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newIndividual() {
    this.setState({
      id: null,
      name: "",
      occupation: "",
      zipcode: "",
      published: false,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newIndividual}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Occupation</label>
              <input
                type="text"
                className="form-control"
                id="occupation"
                required
                value={this.state.occupation}
                onChange={this.onChangeOccupation}
                name="occupation"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Zip Code</label>
              <input
                type="text"
                className="form-control"
                id="zipcode"
                required
                value={this.state.zipcode}
                onChange={this.onChangeZipCode}
                name="zipcode"
              />
            </div>
            <button onClick={this.saveIndividual} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
