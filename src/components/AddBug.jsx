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
    const { updateTeamState } = this.context;
    const { data } = this.state;
    const { title, description } = data;

    e.preventDefault();

    if (title !== undefined && description !== undefined) {
      const user = authService.getCurrentUser();

      const team = await teamService.addBug({
        email: user.email,
        teamid: user.team,
        title: title,
        description: description,
        isOpen: true,
      });

      if (team != null) {
        updateTeamState(team.data);
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
          New Bug
        </button>
        {showModal ? (
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
