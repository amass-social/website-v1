// =============================================================================
// About: MessageList.js
// =============================================================================
/*
  1) MessageList contains <MessageList/>, a component that:
    - holds a list of messages for a post

    <MessageList/>'s Props:
      - n/a

    <MessageList/>'s Children:
      - <Message/>

    <MessageList/>'s Parents:
      - n/a
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './MessageList.css';
import Message from './Message.js';

// Constants -------------------------------------------------------------------
const LOREM = `lorem ipsum dolor sit amet consectetur adipiscing elit Proin
               metus elit, dapibus a odio et elementum suscipit sem`;
const USERS = ['username', 'friend'];

let generatePlaceholderMessage = () => {
  /**
   * Generates a message to use for testing Message appearance.
   */
  let dictionary = LOREM.split(' ');
  let numberOfWords = Math.floor(Math.random() * 20) + 1

  let message = ''
  for (let i = 0; i < numberOfWords; ++i) {
    let randomWord = Math.floor(Math.random() * dictionary.length);
    message += dictionary[randomWord] + ' '
  }

  return message;
}

let MESSAGES = () => {
  /**
   * Generates a list of <Message/>s for testing.
   */
  let numberOfMessages = Math.floor(Math.random() * 5) + 1;
  let user = USERS[1];  // first message always sent by friend

  let messages = [];
  for (let i = 0; i < numberOfMessages; ++i) {
    messages.push(
      <Message 
          sender  = {user} 
          text    = {generatePlaceholderMessage()}
      />
    )
    user = USERS[Math.floor(Math.random() * 2)];
  }

  return messages;
}

// =============================================================================
// <MessageList/>
// =============================================================================

class MessageList extends React.Component {
  render() {
    return (
      <div class="message-list">
        {MESSAGES().map(message => {
          return message;
        })}
      </div>
    );
  }
}

export default MessageList;
