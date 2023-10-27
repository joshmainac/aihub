import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Admin from './Admin';
import Dashboard from './Dashboard';
import Navbar from './Navbar';


function App() {
  return (
    <Router>
      <div>

        <Navbar />

        {/* Routes */}
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <Home />
          </Route>


        </Switch>
      </div>
    </Router>
  );
}

export default App;
