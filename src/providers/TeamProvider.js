import React, { Component, createContext } from "react";
import * as authService from "../services/authService";
import * as teamService from "../services/teamService";

export const TeamContext = createContext();
TeamContext.displayName = "TeamContext";

class TeamProvider extends Component {
  state = {
    team: null,
  };

  componentDidMount = async () => {
    const user = authService.getCurrentUser();
    if (user && user.isAdmin == null && user.team > 0) {
      const team = await teamService.getCurrentUserTeam(user.team);
      this.setState({ team });
    }
  };
  updateTeamState = async team => {
    this.setState({ team });
  };
  render() {
    const { team } = this.state;
    const { children } = this.props;
    return (
      <TeamContext.Provider
        value={{ currentTeam: team, updateTeamState: this.updateTeamState }}>
        {children}
      </TeamContext.Provider>
    );
  }
}

export default TeamProvider;