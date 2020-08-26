// =============================================================================
// About: Message.js
// =============================================================================
/**
  1) Message contains <Message/>, a component that:
    - displays the content of a message sent from one user to another.

    <Message/>'s Props:
      @param {string} sender The username of the person sending the message
      @param {string} timestamp The time the message was sent at
      @param {string} text The content of the message
      @param {boolean} displayProfilePicture Whether or not to display profile
      picture

    <Message/>'s Children:
      - n/a

    <Message/>'s Parents:
      - <MessageList/>
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './Message.css';
import ProfilePicture from '../User/ProfilePicture.js';
import Timestamp from './Timestamp';

// Constants -------------------------------------------------------------------

const CURR_USER = 'username';

// =============================================================================
// <Message/>
// =============================================================================

class Message extends React.Component {

  format = (this.props.sender === CURR_USER)
    ? 'sent' 
    : 'recieved';

  renderMessageBox = () => {
    return (
      <div class={'message-content ' + this.format}>
        <div class={'message-box ' + this.format}>
          {this.props.text}
        </div>
        <Timestamp 
          time={this.props.timestamp} 
          sender={this.props.sender}
          className={(this.format === 'sent')
            ? 'align-right'
            : 'align-left'
          }
        />
      </div>
    )
  }

  renderProfilePicture = () => {
    /**
     * Display profile picture if directed to.
     * If a profile picture shouldn't be displayed render an empty one to 
     * maintain spacing of messages.
     */
    if (this.props.displayProfilePicture) {
      return <ProfilePicture src='https://i.imgur.com/c1Tn08T.jpg'/>
    } else {
      return <ProfilePicture />
    }
  }

  renderSentMessage = () => {
    /**
     * Displays a message with all elements right aligned.
     */
    return (
      <>
        {this.renderMessageBox()}
        {this.renderProfilePicture()}
      </>
    )
  }

  renderRecievedMessage = () => {
    /**
     * Displays a message with all elements left aligned.
     */
    return (
      <>
        {this.renderProfilePicture()}
        {this.renderMessageBox()}
      </>
    )
  }

  render() {
    return (
      <div class="message">
        {
          (this.format === 'sent')
            ? this.renderSentMessage()
            : this.renderRecievedMessage()
        }
      </div>
    )
  }
}

export default Message;
