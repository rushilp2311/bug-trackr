import React, { Component } from "react";
import authService from "../services/authService";
import Modal from "./common/Modal";
import { TeamContext } from "../providers/TeamProvider";
import * as teamService from "../services/teamService";

class DeleteBug extends Component {
  static contextType = TeamContext;
  state = {
    showModal: false,
  };

  handleClick = async () => {
    const currentBug = this.props.bug;
    const currentUser = authService.getCurrentUser();

    if (currentUser.id === currentBug.createdBy._id) {
      const bug = {
        teamid: currentUser.team,
        bugid: currentBug._id,
      };
      const team = await teamService.deleteBug(bug);

      if (team != null) {
        this.toggleModal();
        this.context.updateTeamState(team.data);
        window.location = "/";
      }
    }
  };

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  render() {
    return (
      <>
        <button onClick={this.toggleModal}>Delete this bug</button>
        {this.state.showModal ? (
          <Modal>
            <div className="delete__modal">
              <p>Are you sure you want to delete this bug?</p>
              <button onClick={this.handleClick} className="delete__modal__deletebtn">Delete This Bug</button>
              <button onClick={this.toggleModal} className="delete__modal__closebtn">Close</button>
            </div>
          </Modal>
        ) : null}
      </>
    );
  }
}

export default DeleteBug;
