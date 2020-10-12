import React, { Component } from "react";
import Modal from "./common/Modal";
import { joinTeam } from "../services/userService";
import { UserContext } from "../providers/UserProvider";
class AddTeam extends Component {
  state = {
    showModal: false,
    teamid: 0,
  };

  joinaTeam = async user => {
    if (this.state.teamid > 0) {
      const result = await joinTeam(user);
      if (result) {
        await this.props.context.updateUserState(result.data);
      } else {
        console.log("Team Not Found");
      }
    }
    window.location = "/";
  };
  handleChange = ({ currentTarget: input }) => {
    console.log(input.value);
    if (input.value !== null && input.value > 0) {
      let teamid = input.value;
      this.setState({ teamid });
    }
  };
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  render() {
    return (
      <div className='addteam__container'>
        <h1>You are not in a Team </h1>
        <div className='addteam__body'>
          <h4>Join a team to contribute </h4>
          <button onClick={this.toggleModal}>Join a Team</button>
        </div>
        {this.state.showModal ? (
          <Modal>
            <div className='modal__container'>
              <div className='modal__header'>
                <h1>Join a Team</h1>
              </div>
              <div className='modal__body'>
                <h5>Enter the Team Id to Join </h5>
                <div className='modal__form__controls'>
                  <input type='number' onChange={this.handleChange} />
                  <UserContext.Consumer>
                    {value => (
                      <button
                        onClick={() =>
                          this.joinaTeam({ ...value, team: this.state.teamid })
                        }>
                        Join
                      </button>
                    )}
                  </UserContext.Consumer>
                </div>
                <button onClick={this.toggleModal}>Close</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}
export default AddTeam;
