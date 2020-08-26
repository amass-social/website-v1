// =============================================================================
// About: MessageList.js
// =============================================================================
/**
  1) MessageList contains <MessageList/>, a component that:
    - holds a list of messages for a post

    <MessageList/>'s Props:
      @param {object[]} messages An array of messages with properties: sender, 
      text, and timestamp

    <MessageList/>'s Children:
      - <Message/>

    <MessageList/>'s Parents:
      - n/a
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './MessageList.css';
import Message from './Message.js';

// =============================================================================
// <MessageList/>
// =============================================================================

class MessageList extends React.Component {
  parseMessages = (messages) => {
    /**
     * Parses a list of messages.
     * @param {object[]} messages A list of message objects
     * @example
     * // returns [<Message sender='user' text='hi' timestamp=Date(123456)/>
     * parseMessages([{sender:'user', text: 'hi', timestamp:Date(123456)}])
     */
    let messageComponents = [];
    for (let i = 0; i < messages.length; ++i) {
      let lastMessage = {};
      if (i > 0) lastMessage = messages[i-1];
      let currMessage = messages[i];

      messageComponents.push(
        <Message
          sender    = {currMessage.sender}
          text      = {currMessage.text}
          timestamp = {currMessage.timestamp}
          displayProfilePicture = {(lastMessage.sender === currMessage.sender)
            ? false
            : true
          }
        />
      )
    }

    return messageComponents;
  }

  render() {
    return (
      <div class="message-list">
        {this.parseMessages(this.props.messages).map(message => {
          return message;
        })}
      </div>
    );
  }
}

export default MessageList;
