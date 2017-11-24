import React from 'react'
import VotingButtons from './VotingButtons'
import {Link} from 'react-router-dom';

export default class Voting extends React.Component {
    
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