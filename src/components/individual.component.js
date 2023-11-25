import React, { Component } from "react";
import IndividualDataService from "../services/individual.service";
import { withRouter } from '../common/with-router';

class Individual extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeOccupation = this.onChangeOccupation.bind(this);
    this.onChangeZipCode = this.onChangeZipCode.bind(this);
    this.getIndividual = this.getIndividual.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateIndividual = this.updateIndividual.bind(this);
    this.deleteIndividual = this.deleteIndividual.bind(this);

    this.state = {
      currentIndividual: {
        id: null,
        name: "",
        occupation: "",
        zipcode: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getIndividual(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentIndividual: {
          ...prevState.currentIndividual,
          name: name
        }
      };
    });
  }

  onChangeOccupation(e) {
    const occupation = e.target.value;
    
    this.setState(prevState => ({
      currentIndividual: {
        ...prevState.currentIndividual,
        occupation: occupation
      }
    }));
  }

  onChangeZipCode(e) {
    const zipcode = e.target.value;
    
    this.setState(prevState => ({
      currentIndividual: {
        ...prevState.currentIndividual,
        zipcode: zipcode
      }
    }));
  }

  getIndividual(id) {
    IndividualDataService.get(id)
      .then(response => {
        this.setState({
          currentIndividual: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentIndividual.id,
      name: this.state.currentIndividual.name,
      occupation: this.state.currentIndividual.occupation,
      zipcode: this.state.currentIndividual.zipcode,
      published: status
    };

    IndividualDataService.update(this.state.currentIndividual.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentIndividual: {
            ...prevState.currentIndividual,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateIndividual() {
    IndividualDataService.update(
      this.state.currentIndividual.id,
      this.state.currentIndividual
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Individual was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteIndividual() {    
    IndividualDataService.delete(this.state.currentIndividual.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/Individuals');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentIndividual } = this.state;

    return (
      <div>
        {currentIndividual ? (
          <div className="edit-form">
            <h4>Individual</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentIndividual.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Occupation</label>
                <input
                  type="text"
                  className="form-control"
                  id="occupation"
                  value={currentIndividual.occupation}
                  onChange={this.onChangeOccupation}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">ZipCode</label>
                <input
                  type="text"
                  className="form-control"
                  id="zipcode"
                  value={currentIndividual.zipcode}
                  onChange={this.onChangeZipCode}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentIndividual.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentIndividual.published ? (
              <button
                className="badge bg-dark mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge bg-dark mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge bg-dark mr-2"
              onClick={this.deleteIndividual}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge bg-dark"
              onClick={this.updateIndividual}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Individual...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Individual);