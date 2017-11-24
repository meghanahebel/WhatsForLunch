import React from 'react';
import TimeRemaining from './TimeRemaining';

export default class Countdown extends React.Component {
    render() {
        return(
            <div className="countdown">
            <h1>Time Remaining</h1>
            <TimeRemaining />
            </div>
        )
    }
}