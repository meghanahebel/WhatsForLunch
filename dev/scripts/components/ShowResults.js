import React from 'react';
import ReactDOM from 'react-dom';
import {ajax} from 'jquery';
import firebase from 'firebase';
import Restaurant from './Restaurant';


export default class ShowResults extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurantData: [],
            foodChoices: {},
            TopChoice: {
                name: "",
                vote: 0
            },
            show: false
        }
        this.outputRestaurants = this.outputRestaurants.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentWillMount() {
        let foodChoices = firebase.database().ref('/foodChoices');
        foodChoices.on('value', (snapshot)=> {
            this.setState ({
                foodChoices: snapshot.val(),
            })
        })

        let winningVote = firebase.database().ref(`/winningVote`);
        winningVote.on('value', (snapshot)=> {
            this.setState({
                TopChoice: snapshot.val()
            })
        })

        let restaurantArray = firebase.database().ref(`/restaurantArray`);
        restaurantArray.on('value', (snapshot)=> {
            this.setState({
                restaurantData: snapshot.val()
            })
        })
    }

    componentDidMount() {
        // But we have to send the 'user-key' via headers
        setTimeout(function() {
            let cuisine = this.state.TopChoice.name
            // console.log(cuisine)
            // console.log(this.state.foodChoices[cuisine].id)

            ajax({
                url: 'http://proxy.hackeryou.com',
                dataType: 'json',
                method:'GET',
                data: {
                reqUrl: 'https://developers.zomato.com/api/v2.1/search',
                params: {
                    lat: '43.64830939019639',
                    lon: '-79.39791172742844',
                    sort: "real_distance",
                    order: "desc",
                    count: "5",
                    cuisines: this.state.foodChoices[cuisine].id
                },
                proxyHeaders: {
                    'user-key': '14bd8bcf070a8b8efbd5e88ccde13183'
                },
                xmlToJSON: false,
                useCache: false
                },
                success: (res) =>
                {
                firebase.database().ref(`/restaurantArray`).set(res.restaurants)
                this.setState({show: true});
                }
            }).done(() => {
                console.log('done')
            })}.bind(this)
            , 1000)
        
    }

    outputRestaurants() {
        // let restaurants = this.state.restaurant
        // restaurants.forEach()

        for(let i=0; i<this.state.restaurantData.length; i=i+1) {
            let path = this.state.restaurantData[i].restaurant
            console.log(i)
            return(this.testing(path))
        }
    }

    reset(e) {
        e.preventDefault();
        firebase.database().ref('/winningVote').set({
            name: "",
            vote: 0
        });
        firebase.database().ref(`/triggerResults`).set({showResults:false});
        // this.props.showResults()
    }

    render() {
        return (
            <div className = "showresults">
                <button 
                className = "link"
                onClick = {this.reset}>Reset Votes!</button>
                <h2>Results are showing!</h2>
                {/* {setTimeout(function(){this.testing()}.bind(this), 2000)} */}
                <div className="gallery">
                    {this.state.restaurantData.map((path, i) => {
                        path = path.restaurant;
                        return(
                            <div key={path.id} className="restaurant-option">
                                <h1>{path.name}</h1>
                                <p>Rating: {path.user_rating.aggregate_rating}</p>
                                <p>Average Cost for 2: {path.average_cost_for_two}</p>
                                <img src={path.thumb} alt=""/>
                                <p>Location: {path.location.address}</p>
                                <a href={path.menu_url}>Menu</a>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }


}