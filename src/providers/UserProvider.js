import React, { Component, createContext } from "react";
import * as authService from "../services/authService";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null,
  };
  componentDidMount = () => {
    const user = authService.getCurrentUser();
    this.setState({ user });
  };
  updateUserState = async user => {
    this.setState({ user });
    await authService.updateJWTToken(user.email);
    
  };
  render() {
    const { user } = this.state;
    const { children } = this.props;
    return (
      <UserContext.Provider
        value={{ currentUser: user, updateUserState: this.updateUserState }}>
        {children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
