import React from 'react'
import VotingButtons from './VotingButtons'
import {Link} from 'react-router-dom';
import firebase from 'firebase';

export default class Voting extends React.Component {
    
    constructor() {
        super();
        this.state = {
            voteCounter: 5,
            foodChoices: {},
            TopChoice: {
                name: "",
                vote: 0
            }
        }
        this.voteCounter = this.voteCounter.bind(this);
        this.voteMessageDisplay = this.voteMessageDisplay.bind(this);
        this.winningVote = this.winningVote.bind(this);
    }

    componentDidMount() {
        console.log(this.state.voteCounter)

        let winningVote = firebase.database().ref(`/winningVote`);
        winningVote.on('value', (snapshot)=> {
            this.setState({
                TopChoice: snapshot.val()
            })
        })

        let foodChoices = firebase.database().ref('/foodChoices');
        // let foodArray = {american: { name: 'American', id: 1, vote: 0 },
        // british: {name: 'British', id: 133, vote: 0},
        // bagels: { name: 'Bagels', id: 955, vote: 0},
        // chinese: {name: 'Chinese', id: 25, vote: 0},
        // french: {name: 'French', id: 45, vote: 0 },
        // greek: {name: 'Greek',id: 156,vote: 0},
        // indian: {name: 'Indian',id: 148,vote: 0},
        // italian: {name: 'Italian',id: 55,vote: 0},
        // japanese: {name: 'Japanese',id: 60,vote: 0},
        // mediterranean: {name: 'Mediterranean', id: 70, vote: 0},
        // mexican: {name: 'Mexican', id: 73,vote: 0},
        // pizza: {name: 'Pizza', id:82, vote: 0},
        // ramen: {name: 'Ramen', id:320, vote:0},
        // breakfast: {name: 'Breakfast' ,id: 182,vote: 0},
        // spanish: {name: 'Spanish',id: 89,vote: 0},
        // thai: {name: 'Thai',id: 95, vote: 0},
        // turkish: {name: 'Turkish', id: 142,vote: 0},
        // vietnamese: {name: 'Vietnamese', id: 99,vote: 0}}
        // foodChoices.set(foodArray);
        foodChoices.on('value', (snapshot)=> {
            this.setState ({
                foodChoices: snapshot.val(),
            })
        })

        // let voteCounter = firebase.database().ref('/userInfo');
        // voteCounter.on('value', (snapshot)=> {
        //     this.setState ({
        //         voteCounter: snapshot.val().voteCounter,
        //     })
        // })

    }

    voteCounter(cuisineVoted) {
        let newState = this.state.foodChoices;
        let newCounterVal = this.state.voteCounter;
        
        if (newCounterVal > 0) {
            newState[cuisineVoted].vote++;
            newCounterVal--;
            firebase.database().ref(`/foodChoices/`).set(newState)
            this.setState({
                voteCounter: newCounterVal
            })
        }
    }

    voteMessageDisplay() {
        if(this.state.voteCounter === 0) {
            {this.winningVote()}
            return(
            <div className="boxCenter">
                <h3 id="voteMessage">You have no more votes! You will be redirected to the Results Page!</h3>
                <Link className = "link" to="/results">Results</Link>
            </div>)
        }
        else {
            return(<h3>You have <span id="voteCounter">{this.state.voteCounter}</span> votes left!</h3>)
        }
    }

    winningVote() {
        let path = this.state.foodChoices;
        let maxVote = this.state.TopChoice.vote;
        for(let cuisine in path) {
            if(path[cuisine].vote > maxVote) {
                maxVote = path[cuisine].vote;
                firebase.database().ref(`/winningVote`).set({name: cuisine, vote:maxVote})
            }
        }
    }


    render() {
        const cuisineChoices = this.state.foodChoices;
        return(   
            <div className = "container voting">
                <h1>It's Time To Vote!</h1>
                <div className = "cuisine">
                    {Object.keys(cuisineChoices).map((cuisineType) => {
                    return (<VotingButtons key={cuisineType} className = "cuisineButtons" cuisineKey = {cuisineType} cuisineInfo = {cuisineChoices[cuisineType]} handleClick = {this.voteCounter} />)
                    })}
                </div>
                {this.voteMessageDisplay()}
            </div>
        )
    }

}

// attach votecounter to database with user options 
// ref(/userInfo)
// didVote? + voteCounter
// attach listener to did mount to update the state
// when countdown hits 0, update it to 5 again - when countdown hits 0, reset votes of database to 0
