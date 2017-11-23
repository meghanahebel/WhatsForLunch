import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {ajax} from 'jquery';
import {
  BrowserRouter as Router, Route, Link
  } from 'react-router-dom';


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


// NAVIGATION

class Navigation extends React.Component {
  render() {
    return(
      <div className = "container navigation">
        <nav>This is the navigation</nav> 
      </div>
    )
  }
}

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

// SIGN IN

class SignIn extends React.Component {
  render() {
    return (
      <div className = "container signin">
        <h2>This is the sign up part for firebase</h2>
      </div>
    )
  }
}

// VOTING

class Voting extends React.Component {

  constructor() {
    super();
    this.state = {
      voteCounter: 5,
      foodChoices: {
        american: { name: 'American', img: '', vote: 0 },
        british: {name: 'British', img: '', vote: 0},
        caribbean: { name: 'Caribbean', img: '', vote: 0},
        chinese: {name: 'Chinese', img: '', vote: 0},
        french: {name: 'French', img: '', vote: 0 },
        greek: {name: 'Greek',img: '',vote: 0},
        indian: {name: 'Indian',img: '',vote: 0},
        italian: {name: 'Italian',img: '',vote: 0},
        japanese: {name: 'Japanese',img: '',vote: 0},
        mediterranean: {name: 'Mediterranean', img: '', vote: 0},
        mexican: {name: 'Mexican', img: '',vote: 0},
        moroccan: {name: 'Moroccan',img: '',vote: 0},
        spanish: {name: 'Spanish',img: '',vote: 0},
        thai: {name: 'Thai',img: '', vote: 0},
        turkish: {name: 'Turkish',img: '',vote: 0},
        vietnamese: {name: 'Vietnamese',img: '',vote: 0},
      }
    }
    this.voteCounter = this.voteCounter.bind(this);
    this.voteMessageDisplay = this.voteMessageDisplay.bind(this);
  }

  voteCounter(cuisineVoted) {
    let newState = Object.assign(this.state.foodChoices);
    let newCounterVal = this.state.voteCounter;
    if (newCounterVal > 0) {
      newState[cuisineVoted].vote++;
      newCounterVal--;
      this.setState({
        foodChoices: newState,
        voteCounter: newCounterVal
      })
    }
  }

  voteMessageDisplay() {
    if(this.state.voteCounter === 0) {
      return(
        <div>
          <h3>You have no more votes! You will be redirected to the Results Page!</h3>
          <Link to="/results">Results</Link>
        </div>)
    }
    else {
      return(<h3>You have {this.state.voteCounter} votes left!</h3>)
    }
  }


  render() {
    const cuisineChoices = this.state.foodChoices;
    return(   
      <div className = "container voting">
        <h1>It's Time To Vote!</h1>
        <div className = "cuisine">
          {Object.keys(cuisineChoices).map((cuisineType) => {
            return (<VotingButtons key={cuisineType} cuisineKey = {cuisineType} cuisineInfo = {cuisineChoices[cuisineType]} handleClick = {this.voteCounter} />)
          })}
        </div>
        {this.voteMessageDisplay()}
      </div>
    )
  }

}

// VotingButtons

const VotingButtons = (props) => {
  return (
    <button 
    className="cuisineButton"
    onClick = {() => props.handleClick(props.cuisineKey)}
    >
    {props.cuisineInfo.name}
    </button>
  )
}

// RESULTS

class Results extends React.Component {

  componentDidMount() {
    // But we have to send the 'user-key' via headers
    ajax({
      url: 'http://proxy.hackeryou.com',
      dataType: 'json',
      method:'GET',
      data: {
        reqUrl: 'https://developers.zomato.com/api/v2.1/cuisines',
        params: {
          lat: '40.74',
          lon: '-74.004'
        },
        proxyHeaders: {
          'user-key': '14bd8bcf070a8b8efbd5e88ccde13183'
        },
        xmlToJSON: false,
        useCache: false
      }
    }).then(function(res) {
      console.log(res)
    });
  }

  render() {
    return(
      <div className="container results">
          <Countdown />
      </div>
    )
  }
}

// COUNTDOWN

class Countdown extends React.Component {

  render() {
    return(
      <div className="countdown">
        <h1>Time Remaining</h1>
        <TimeRemaining />
      </div>
    )
  }
}

// TIME REMAINING

class TimeRemaining extends React.Component {

  constructor() {
    super()
    this.state = {
      deadline: 'Fri Nov 24 2017 12:59:59 GMT-0500 (EST)'
    }
    this.initializeClock = this.initializeClock.bind(this);
  }

  // getTimeRemaining(deadline) {
  //   let t = Date.parse(deadline) - Date.parse(new Date());
  //   let seconds = Math.floor( (t/1000) % 60 );
  //   let minutes = Math.floor( (t/1000/60) % 60 );
  //   let hours = Math.floor( (t/(1000*60*60)) % 24 );
  //   return {
  //     'total': t,
  //     'hours': hours,
  //     'minutes': minutes,
  //     'seconds': seconds
  //   };
  // }

  initializeClock(deadline) {
    let t = Date.parse(deadline) - Date.parse(new Date());
    let timeinterval = setInterval(function(){
        let seconds = Math.floor( (t/1000) % 60 );
        let minutes = Math.floor( (t/1000/60) % 60 );
        let hours = Math.floor( (t/(1000*60*60)) % 24 );
        // this.setState({
        //   // deadline: 
        // })
        if(t.total<=0){
          clearInterval(timeinterval);
        }
    },1000);
  }


  render() {
    return (
      <div className = "timeremaining">
        {this.initializeClock(this.state.deadline)}
        <h3>Time Remaining</h3>
        <h1>{this.state.deadline}</h1>
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


