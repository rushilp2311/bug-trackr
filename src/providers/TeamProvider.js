import React, { Component, createContext } from "react";
import authService from "../services/authService";
import * as teamService from "../services/teamService";

export const TeamContext = createContext({ team: null });

class TeamProvider extends Component {
  state = {
    team: null,
  };

  componentDidMount = async () => {
    const user = authService.getCurrentUser();
    const team = await teamService.findTeam(user.team);
    this.setState({ team });
  };

  render() {
    const team = this.state;
    const { children } = this.props;
    console.log(team.data);
    return (
      <TeamContext.Provider value={{ currentTeam: team }}>
        {children}
      </TeamContext.Provider>
    );
  }
}

export default TeamProvider;
