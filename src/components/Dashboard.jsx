import React, { Component } from "react";

import { UserContext } from "../providers/UserProvider";
import AddTeam from "./AddTeam";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
class Dashboard extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {value =>
          value.currentUser.isAdmin ? (
            <AdminDashboard />
          ) : value.currentUser.team === 0 ? (
            <>
              
              <AddTeam context={value} />
            </>
          ) : (
            <UserDashboard />
          )
        }
      </UserContext.Consumer>
    );
  }
}

export default Dashboard;
