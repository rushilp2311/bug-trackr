import React, { Component, createContext } from "react";
import authService from "../services/authService";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null,
  };
  componentDidMount = () => {
    const user = authService.getCurrentUser();
    this.setState({ user });
  };

  render() {
    const { user } = this.state;
    const { children } = this.props;
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}

export default UserProvider;
