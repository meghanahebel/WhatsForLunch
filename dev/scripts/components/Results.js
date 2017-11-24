import React from 'react'
import {ajax} from 'jquery';
import Countdown from './Countdown';
import services from '../services';

export default class Results extends React.Component {
    
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
        return res
        console.log(res)
        // include transformation
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