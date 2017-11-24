import React from 'react'

export default class TimeRemaining extends React.Component {
    
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
    