import React from 'react';

let VotingButtons = ({cuisineKey, cuisineInfo, handleClick}) => {
    const {name} = cuisineInfo;
    return (
        <button 
        className="cuisineButton"
        onClick = {() => handleClick(cuisineKey)}
        >
        {name}
        </button>
    )
}

export default VotingButtons