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


// HOMEPAGE

class HomePage extends React.Component {
  render() {
    return (
      <div className = "container homepage">
        <h1>This is the HomePage</h1>
        <p>Don't know what to get for lunch? That can be hard! Not for the people that are unsure, but for those of us that have to deal with them all of the time.</p>
        <p>Kick picky eaters to the curb with this handy-dandy lunch voting app. Smash that like button.</p>
        <Link to={`/signin`}>Sign In</Link>
        <Link to={`/voting`}>Vote Now</Link>
        <Link to={`/results`}>Results</Link>
      </div>
    )
  }
}


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


