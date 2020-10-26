import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as authService from '../services/authService';
import * as userService from '../services/userService';

class TeamDetails extends Component {
  state = {
    usersList: [],
    currentUser: null,
  };

  async componentDidMount() {
    const userList = await userService.getAllUsersByTeamId();
    const currentUser = authService.getCurrentUser();
    this.setState({ currentUser });
    this.setState({ usersList: userList.data });
  }

  render() {
    const { currentUser, usersList } = this.state;
    return (
      <div className="team__details__container">
        <div className="team__details__header">
          <p>Your Team Members</p>
        </div>
        <div className="team__info">
          {currentUser ? <p>Your team id is {currentUser.team}</p> : null}
        </div>
        <div className="team__details__body">
          {usersList.map((user) => (
            <div className="user__info" key={user._id}>
              {user.name === currentUser.name ? (
                <p>
                  {user.name} <span>(You)</span>
                </p>
              ) : (
                <p>{user.name} </p>
              )}
              <h6>{user.email}</h6>
            </div>
          ))}
        </div>
        <div className="back__button">
          <Link to="/">
            <button>Go Back To Bugs List</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default TeamDetails;
