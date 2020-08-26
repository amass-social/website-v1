// =============================================================================
// About: Message.js
// =============================================================================
/**
  1) Message contains <Message/>, a component that:
    - displays the content of a message sent from one user to another.

    <Message/>'s Props:
      @param {string} sender The username of the person sending the message
      @param {string} datatimeSent The time the message was sent at
      @param {string} text The content of the message

    <Message/>'s Children:
      - n/a

    <Message/>'s Parents:
      - <MessageList/>
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './Message.css';
import ProfilePicture from '../User/ProfilePicture.js';

// Constants -------------------------------------------------------------------

const CURR_USER = 'username';

// =============================================================================
// <Message/>
// =============================================================================

class Message extends React.Component {

  format = (this.props.sender === CURR_USER)
    ? ' sent ' 
    : ' recieved ';

  renderMessageBox = () => {
    return (
      <div class={'message-content' + this.format}>
        <div class={'message-box' + this.format}>
          {this.props.text}
        </div>
        <div class={'timestamp' + this.format}>
          Sent at {this.props.datetimeSent} by {this.props.sender}
        </div>
      </div>
    )
  }

  renderSentMessage = () => {
    /**
     * Displays a message with all elements right aligned.
     */
    return (
      <>
        {this.renderMessageBox()}
        <ProfilePicture src='https://i.imgur.com/c1Tn08T.jpg'/>
      </>
    )
  }

  renderRecievedMessage = () => {
    /**
     * Displays a message with all elements left aligned.
     */
    return (
      <>
        <ProfilePicture src='https://i.imgur.com/c1Tn08T.jpg'/>
        {this.renderMessageBox()}
      </>
    )
  }

  render() {
    return (
      <div class="message">
        {
          (this.props.sender === CURR_USER)
            ? this.renderSentMessage()
            : this.renderRecievedMessage()
        }
      </div>
    )
  }
}

export default Message;
