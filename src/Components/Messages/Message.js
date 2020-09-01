// =============================================================================
// About: Message.js
// =============================================================================
/**
  1) Message contains <Message/>, a component that:
    - displays the content of a message sent from one user to another.

    <Message/>'s Props:
      @param  {string}   text The content of the message
      @param  {boolean}  format Whether the message was sent or recieved.

    <Message/>'s Children:
      - n/a

    <Message/>'s Parents:
      - <MessageList/>
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './Message.css';

// =============================================================================
// <Message/>
// =============================================================================

class Message extends React.Component {
  render() {
    return (
      <div class={"message " + this.props.format}>
        {this.props.text}
      </div>
    )
  }
}

export default Message;
