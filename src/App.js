import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import BugDetails from './components/BugDetails';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Home from './components/Home';
import Logout from './components/Logout';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TeamDetails from './components/TeamDeatils';
import { UserContext } from './providers/UserProvider';

function App() {
  const context = useContext(UserContext);
  return (
    <div className="app">
      <Header user={context.currentUser} />
      <div className="container">
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/logout" component={Logout} />
          <Route path="/profile" component={Profile} />
          <Route path="/bugdetails" component={BugDetails} />
          <Route path="/teamdetails" component={TeamDetails} />
          {!context.currentUser && <Route path="/" component={Home} />}
          {context.currentUser && <Route path="/" component={Dashboard} />}

          <Redirect to="/not-found" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
