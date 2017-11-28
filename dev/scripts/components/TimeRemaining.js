import React from 'react'
import firebase from 'firebase'

export default class TimeRemaining extends React.Component {
    
      constructor() {
        super()
        this.state = {
          deadline: "",
          countdown: {
            hours: "",
            minutes: "",
            seconds: "",
            t: "",
          },
          foodChoices: {},
          showResults: ""
        }
        this.initializeClock = this.initializeClock.bind(this);
        this.countdownFinishedMessage = this.countdownFinishedMessage.bind(this);
        this.refreshVotes = this.refreshVotes.bind(this);
        this.triggerResults = this.triggerResults.bind(this);
      }

      componentWillMount() {

        let timeRemaining = firebase.database().ref('/timeRemaining');
        timeRemaining.set({
          deadline: "Fri Nov 28 2017 13:00:00 GMT-0500 (EST)",
          countdown: {
            hours: "",
            minutes: "",
            seconds: "",
            t: "",
          },
        })

        timeRemaining.on('value', (snapshot)=> {
          this.setState ({
              deadline: snapshot.val().deadline,
              countdown: snapshot.val().countdown,
              showResults: snapshot.val().showResults
          })
        })

        let foodChoices = firebase.database().ref('/foodChoices');
        foodChoices.on('value', (snapshot)=> {
            this.setState ({
                foodChoices: snapshot.val(),
            })
        })

        let showResults = firebase.database().ref('/triggerResults');
        showResults.on('value', (snapshot)=> {
            this.setState ({
                showResults: snapshot.val(),
            })
        })
      }

      componentDidMount() {
        setTimeout(function() { this.initializeClock(this.state.deadline); }.bind(this), 1000);
    }
        
      initializeClock(endtime) {
        let timeinterval = setInterval(() => {
            let t = Date.parse(endtime) - Date.parse(new Date());
            let seconds = Math.floor( (t/1000) % 60 );
            let minutes = Math.floor( (t/1000/60) % 60 );
            let hours = Math.floor( (t/(1000*60*60)) % 24 );
            let countdown = {hours, minutes, seconds, t};

            firebase.database().ref('/timeRemaining/').update({countdown: countdown})

            if((hours===0)&&(minutes===0) && (seconds ===0)){
              clearInterval(timeinterval);
              // add one to day
              var current = Date.parse(endtime) //'Mar 11 2015' current.getTime() = 1426060964567
              var followingDay = new Date(current + 86400000); // + 1 day in ms
              firebase.database().ref('/timeRemaining/').update({deadline: `${followingDay}`})

              this.initializeClock(this.state.deadline)
            }
        },1000);
      }

      triggerResults(path) {
        if(path.hours ===  23){
          firebase.database().ref(`/triggerResults`).set({showResults:true})
        }
        else {
          firebase.database().ref(`/triggerResults`).set({showResults:false})
        }
      }

      refreshVotes() {
        let foodArray = this.state.foodChoices;
        for (let cuisine in foodArray) {
          foodArray[cuisine].vote = 0;
        }
        firebase.database().ref('/foodChoices').set(foodArray);
      }

      countdownFinishedMessage() {
        let path = this.state.countdown;
        if((path.hours <= 22)&&(path.hours >= 0)) {
          return(<h1>Time Remaining: {path.hours}h {path.minutes}m {path.seconds}s left</h1>)
        }
        else if((path.hours === 22)&&(path.minutes === 59)&&(path.seconds === 59)) {
          firebase.database().ref('/winningVote').set({
                name: "",
                vote: 0
            })
        }
        else {
          return(<h1>Here are your options! Enjoy lunch! Come back at 2:00 to vote for next lunch</h1>)
        }
      }

      render() {
        return (
          <div className = "timeremaining">
            {this.countdownFinishedMessage()}
            {this.triggerResults(this.state.countdown)}
          </div>
        )
      }
    }
    