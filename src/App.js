import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Logout from "./components/Logout";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className='app'>
      <Header />
      <div className='container'>
        <Switch>
          <Route path='/signup' component={SignUp} />
          <Route path='/signin' component={SignIn} />
          <Route path='/logout' component={Logout} />
          <Route path='/' component={Home} />
          <Redirect to='/not-found' />
        </Switch>
      </div>
    </div>
  );
}

export default App;
