import { Component } from 'react';
import * as authService from '../services/authService';

class Logout extends Component {
  componentDidMount() {
    authService.logout();
    window.location = '/';
  }

  render() {
    return null;
  }
}

export default Logout;
