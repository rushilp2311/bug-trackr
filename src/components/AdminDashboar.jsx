import React, { Component } from "react";
import TeamCard from "./TeamCard";

class AdminDashboard extends Component {
  render() {
    return (
      <div className='admin__dashboard'>
        <div className='admin__header'>
          <p>Admin Dashboard</p>
          <button>Add a Team</button>
        </div>
        <div className='admin__body'>
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
        </div>
      </div>
    );
  }
}
export default AdminDashboard;
