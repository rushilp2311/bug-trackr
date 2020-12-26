import React, { Component } from 'react';
import { MdDelete } from 'react-icons/md';
import socketIOClient from 'socket.io-client';
import * as authService from '../services/authService';
import Modal from './common/Modal';
import { TeamContext } from '../providers/TeamProvider';
import * as teamService from '../services/teamService';

class DeleteBug extends Component {
  static contextType = TeamContext;

  state = {
    showModal: false,
  };

  handleClick = async () => {
    const { bug } = this.props;
    const { updateTeamState } = this.context;
    const currentBug = bug;
    const currentUser = authService.getCurrentUser();

    if (currentUser.id === currentBug.createdBy._id) {
      const team = await teamService.deleteBug({
        teamid: currentUser.team,
        bugid: currentBug._id,
      });

      if (team != null) {
        this.toggleModal();
        const socket = socketIOClient(
          'wss://bug-trackr-backend-d.herokuapp.com/'
        );
        socket.emit('delete bug', `Bug deleted by ${bug.createdBy.name}`);
        // Add Notification
        updateTeamState(team.data);
        window.localStorage.removeItem('currentBug');
        window.location = '/';
      }
    }
  };

  // eslint-disable-next-line react/destructuring-assignment
  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    const { showModal } = this.state;
    return (
      <>
        <button onClick={this.toggleModal}>
          <span>
            <MdDelete />
          </span>{' '}
          Delete this bug
        </button>
        {showModal ? (
          <Modal>
            <div className="delete__modal">
              <p>Are you sure you want to delete this bug?</p>
              <button
                onClick={this.handleClick}
                className="delete__modal__deletebtn"
              >
                Delete This Bug
              </button>
              <button
                onClick={this.toggleModal}
                className="delete__modal__closebtn"
              >
                Close
              </button>
            </div>
          </Modal>
        ) : null}
      </>
    );
  }
}

export default DeleteBug;
