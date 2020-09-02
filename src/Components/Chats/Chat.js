// =============================================================================
// About: Chat.js
// =============================================================================
/*
  1) Chat contains <Chat/>, a component that:
    - contains all the basic components for a conversation between multiple people
      -> shows the messages
      -> includes an input field (<ChatInput/>) for the user to input new messages

    <Chat/>'s Props:
      - n/a for now, but will add later

    <Chat/>'s Children:
      - <ChatInput/>

    <Chat/>'s Parents:
      - <ChatPopup/>

*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './Chat.css';

// components
import ChatInput from '../Inputs/ChatInput.js';

// =============================================================================
// <Chat/>
// =============================================================================

class Chat extends React.Component {
  render() {
    return (
      <div id="Chat">
        <div id="messages-container">
        </div>
        <div id="chat-input-container">
          <ChatInput/>
        </div>
      </div>
    );
  }
}

export default Chat;
