import React, { Component } from "react";
import Modal from "./common/Modal";
import { joinTeam } from "../services/userService";
import { UserContext } from "../providers/UserProvider";
class AddTeam extends Component {
  state = {
    showModal: false,
  };

  joinaTeam = user => {
    joinTeam(user);
    this.props.context.updateUserState(user);
  };
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  render() {
    return (
      <div className='addteam__container'>
        <button onClick={this.toggleModal}>Join a Team</button>
        {this.state.showModal ? (
          <Modal>
            <div className='modal__header'>
              <h1>Join a Team</h1>
            </div>
            <div className='modal__body'>
              <input type='number' />
              <UserContext.Consumer>
                {value => (
                  <button onClick={() => this.joinaTeam({ ...value, team: 1 })}>
                    Join
                  </button>
                )}
              </UserContext.Consumer>
            </div>
            This is a Modal <button onClick={this.toggleModal}>Close</button>
          </Modal>
        ) : null}
      </div>
    );
  }
}
export default AddTeam;
