import React from 'react';
import ReactDOM from 'react-dom';
import {ajax} from 'jquery';
import firebase from 'firebase';
import {
  BrowserRouter as Router, Route, Link
  } from 'react-router-dom';

import Navigation from './components/Navigation';
import SignIn from './components/SignIn';
import Results from './components/Results';
import Voting from './components/Voting';
import HomePage from './components/HomePage';
import services from './services';


  // Initialize Firebase
var config = {
    apiKey: "AIzaSyD1mEQlx2chMfNLeIOQDT5WmDGFYOy43ic",
    authDomain: "what-s-for-lunch-2aabb.firebaseapp.com",
    databaseURL: "https://what-s-for-lunch-2aabb.firebaseio.com",
    projectId: "what-s-for-lunch-2aabb",
    storageBucket: "",
    messagingSenderId: "487855541218"
};

firebase.initializeApp(config);

// APP

class App extends React.Component {
  
    render() {
      return (
        <Router>
          <div>
            <Navigation />
            <Route exact path = "/" component = {HomePage} />
            <Route path = "/signin" component = {SignIn} />
            <Route path = "/voting" component = {Voting} />
            <Route path = "/results" component = {Results} />
              {/* <Route path = "/sign-up" component = {Results} /> */}
          </div>
    
        </Router>

      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));


