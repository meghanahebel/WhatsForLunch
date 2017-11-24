import React from 'react';
import {Link} from 'react-router-dom';
  

export default class HomePage extends React.Component {
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