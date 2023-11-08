import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Admin from './Admin';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import MediaUploader from './MediaUploader';
import MessageApp from './sns/MessageApp';


function App() {
  return (
    <Router>

      <Navbar />

      {/* Routes */}
      <Switch>
        <Route path="/messageApp">
          <MessageApp />
        </Route>
        <Route path="/mediaUploader">
          <MediaUploader />
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
