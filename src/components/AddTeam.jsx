/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import Modal from './common/Modal';
import * as teamService from '../services/teamService';

class AddTeam extends Component {
  state = {
    showModal: false,
    data: {},
  };

  handleSubmit = async (e) => {
    const { data } = this.state;
    const { name, id } = data;

    e.preventDefault();

    if (name !== undefined && id !== undefined) {
      const team = await teamService.addTeam({
        name: data.name,
        id: data.id,
        bugs: [],
      });

      if (team != null) {
        window.location = '/';
      }

      this.toggleModal();
    }
  };

  handleChange = ({ currentTarget: input }) => {
    // eslint-disable-next-line react/destructuring-assignment
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  render() {
    const { showModal } = this.state;
    return (
      <>
        <button
          className="dashboard__controls__button"
          onClick={this.toggleModal}
        >
          Add a Team
        </button>
        {showModal ? (
          <Modal>
            <div className="modal__container bug__modal__container">
              <div className="modal__header bug__modal__header">
                <h1>Add a New Team</h1>
              </div>
              <div className="modal__body bug__modal__body">
                <div className="modal__form__controls bug__modal__form__controls">
                  <div className="group">
                    <label>Enter Name</label>
                    <input
                      type="text"
                      name="name"
                      onChange={this.handleChange}
                      placeholder="Enter name of your team"
                    />
                  </div>
                  <div className="group">
                    <label>Enter Id</label>
                    <input
                      type="number"
                      name="id"
                      onChange={this.handleChange}
                      placeholder="Enter Id of your team"
                    />
                  </div>

                  <div className="btn-group">
                    <button onClick={this.handleSubmit}>Add Team</button>
                    <button onClick={this.toggleModal} className="close-btn">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        ) : null}
      </>
    );
  }
}
export default AddTeam;
