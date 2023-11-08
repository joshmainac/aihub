import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Admin from './Admin';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import MessageApp from './sns/MessageApp';

import MediaUploader from './MediaUploader';
import './App.css';



function App() {
  return (
    <Router>

      <Navbar />

      {/* Routes */}
      <Switch>

        <Route path="/mediaUploader">
          <MediaUploader />
        </Route>

        <Route path="/messageApp">
          <MessageApp />
        </Route>

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
    </Router>
  );
}

export default App;
