/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import Modal from './common/Modal';
import { TeamContext } from '../providers/TeamProvider';
import * as teamService from '../services/teamService';
import * as authService from '../services/authService';

class AddBug extends Component {
  static contextType = TeamContext;

  state = {
    showModal: false,
    data: {},
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (
      this.state.data.title !== undefined &&
      this.state.data.description !== undefined
    ) {
      const user = authService.getCurrentUser();
      const bug = {
        email: user.email,
        teamid: user.team,
        title: this.state.data.title,
        description: this.state.data.description,
        isOpen: true,
      };

      const team = await teamService.addBug(bug);
      if (team != null) {
        this.context.updateTeamState(team.data);
      }
      this.toggleModal();
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    return (
      <>
        <button
          className="dashboard__controls__button"
          onClick={this.toggleModal}
        >
          New Bug
        </button>
        {this.state.showModal ? (
          <Modal>
            <div className="modal__container bug__modal__container">
              <div className="modal__header bug__modal__header">
                <h1>Add a New Bug</h1>
              </div>
              <div className="modal__body bug__modal__body">
                <div className="modal__form__controls bug__modal__form__controls">
                  <div className="group">
                    <label>Enter the Title</label>
                    <input
                      type="text"
                      name="title"
                      onChange={this.handleChange}
                      placeholder="Add a title of your issue"
                    />
                  </div>
                  <div className="group">
                    <label>Enter Description of Bug</label>
                    <textarea
                      style={{ height: '100px' }}
                      name="description"
                      onChange={this.handleChange}
                      placeholder="Give Description"
                    />
                  </div>
                  <div className="btn-group">
                    <button onClick={this.handleSubmit}>Submit New Bug</button>
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
export default AddBug;
