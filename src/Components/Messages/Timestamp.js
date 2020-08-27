// =============================================================================
// About: Timestamp.js
// =============================================================================
/**
  1) Timestamp contains <Timestamp/>, a component that:
    - contains information about the time since a post or message was made and
      who made/sent it.

    <Timestamp/>'s Props:
      @param {number} time The time the post was made in milliseconds
      @link https://www.w3schools.com/jsref/jsref_obj_date.asp
      @param {string} sender The name of the user the post/message is from
      @param {string} className Class names appended in a single string

    <Timestamp/>'s Children:
      - n/a

    <Timestamp/>'s Parents:
      - n/a
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './Timestamp.css';


// =============================================================================
// <Timestamp/>
// =============================================================================

class Timestamp extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      timeElapsedString: ''
    }
  }

  componentDidMount () {
    this.tickIntervalPointer = setInterval(
      this.updateTimeElapsed,
      60000  // Update time every minute
    );
    this.updateTimeElapsed();
  }

  componentWillUnmount () {
    clearInterval(this.tickIntervalPointer);
  }

  formatTime = (quantity, unit) => {
    /**
     * Takes a unit of time and its respective unit.
     * This function basically just adds an 's' to the unit name if it is more
     * than one.
     * @param {number} quantity The number of units to represent
     * @param {string} unit The type of unit in singular form (second, minute, ...)
     */
    return (quantity > 1)
      ? quantity + ' ' + unit + 's ago'
      : quantity + ' ' + unit + ' ago'
      ;
  }
  
  updateTimeElapsed = () => {
    /**
     * Finds how much time has passed since the post date and updates it for 
     * Timestamp to display.
     * @todo Add logic for months and years
     */
    let deltaTime = Date.now() - this.props.time;
    let newTimeString = 'some time ago';

    if (deltaTime < 60000) {  // time passed is less than a minute
      newTimeString = 'less than a minute ago';
    } else if (deltaTime < 3600000) {  // time passed is less than an hour
      let minutesPassed = Math.floor(deltaTime/1000/60);
      newTimeString = this.formatTime(minutesPassed, 'minute');
    } else if (deltaTime < 86400000) {  // time passed is less than a day
      let hoursPassed = Math.floor(deltaTime/1000/60/60);
      newTimeString = this.formatTime(hoursPassed, 'hour');
    } else if (deltaTime >= 86400000) { // time passed is a day or more
      let daysPassed = Math.floor(deltaTime/1000/60/60/24);
      newTimeString = this.formatTime(daysPassed, 'day');
    }

    this.setState({timeElapsedString: newTimeString})
  }
  
  render() {
    return (
      <div className={'timestamp ' + this.props.className}>
        sent {this.state.timeElapsedString} by {this.props.sender}
      </div>
    )
  }
}

export default Timestamp;
