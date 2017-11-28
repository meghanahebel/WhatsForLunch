import React from 'react';
import ReactDOM from 'react-dom';
import {ajax} from 'jquery';
import Countdown from './Countdown';
import services from '../services';
import firebase from 'firebase';
import ShowResults from './ShowResults';
import TimeRemaining from './TimeRemaining';

export default class Results extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            showResults: "",
            deadline: ""
        
        }
        this.whenShowResults = this.whenShowResults.bind(this);
    }

    componentWillMount() {
        let showResults = firebase.database().ref('/triggerResults');
        showResults.on('value', (snapshot)=> {
            this.setState ({
                showResults: snapshot.val(),
            })
        })

    }
    
    whenShowResults() {
        if(this.state.showResults.showResults === true) {
            return(
                <ShowResults showResults = {this.whenShowResults}/>
            )
        }
    }
    render() {
    return(
        <div className="container results">
            <TimeRemaining inputDeadline = {this.state.deadline}/>
            {this.whenShowResults()}
        </div>
    )
    }
}