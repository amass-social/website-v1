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
import MessageList from '../Messages/MessageList.js';
import PreventOutsideScrollingContainer from '../Wrappers/PreventOutsideScrollingContainer';

// =============================================================================
// <Chat/>
// =============================================================================

class Chat extends React.Component {
  constructor() {
    super();
    this.messageContainer = React.createRef(); // For scrolling to bottom
  }

  componentDidMount() {
    this.scrollToBottomOfMessages();
  }

  componentDidUpdate() {
    this.scrollToBottomOfMessages();
  }

  scrollToBottomOfMessages = () => {
    this.messageContainer.current.scrollTop = this.messageContainer.current.scrollHeight;
  }

  render() {
    return (
      <div id="Chat">
        <PreventOutsideScrollingContainer 
        id="messages-container" 
        containerRef={this.messageContainer}
      >
            <MessageList 
              messages={this.props.messages}
            />
        </PreventOutsideScrollingContainer>
        <div id="chat-input-container">
          <ChatInput onSubmit={text => this.props.onSendMessage(text)}/>
        </div>
      </div>
    );
  }
}

export default Chat;
