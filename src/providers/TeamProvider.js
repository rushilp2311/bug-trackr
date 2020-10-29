/* eslint-disable react/jsx-filename-extension */
import React, { Component, createContext } from 'react';
import * as authService from '../services/authService';
import * as teamService from '../services/teamService';
import * as userService from '../services/userService';

export const TeamContext = createContext();
TeamContext.displayName = 'TeamContext';

class TeamProvider extends Component {
  state = {
    team: null,
    userList: [],
  };

  componentDidMount = async () => {
    const user = authService.getCurrentUser();
    if (user && user.isAdmin == null && user.team > 0) {
      const team = await teamService.getCurrentUserTeam(user.team);
      const userList = await userService.getAllUsersByTeamId();
      this.setState({ userList: userList.data });
      this.setState({ team });
    }
  };

  updateTeamState = (team) => {
    this.setState({ team });
  };

  getCurrentTeam = () => {
    return this.state.team;
  };

  render() {
    const { team, userList } = this.state;
    const { children } = this.props;
    return (
      <TeamContext.Provider
        value={{
          currentTeam: team,
          userList: userList,
          updateTeamState: this.updateTeamState,
          getCurrentTeam: this.getCurrentTeam,
        }}
      >
        {children}
      </TeamContext.Provider>
    );
  }
}

export default TeamProvider;
