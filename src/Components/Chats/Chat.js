// =============================================================================
// About: Chat.js
// =============================================================================
/*
  Chat contains <Chat/>, a component that:
    - contains all the basic components for a conversation between multiple people
      -> shows the messages
      -> includes an input field (<ChatInput/>) for the user to input new messages

  Chat also contains <ChatInput/>, which is responsible for:
    - being the text input that the user types into when using <Chat/>
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './Chat.css';

import AdjustableTextArea from '../Inputs/AdjustableTextArea.js';
import EmojiSelect        from '../Inputs/EmojiSelect.js';

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


// =============================================================================
// <ChatInput/>
// =============================================================================

class ChatInput extends React.Component {

  constructor() {
    super();
    this.state = {
      text              : "",
      emojiSelectActive : false
    };
  }

  // sends the user's message and wipes state
  sendText = (textToSend) => {
    this.setState({text: ""});
  }

  onClick_toggleEmojiSelect = () => {
    this.setState({emojiSelectActive: !this.state.emojiSelectActive});
    this.forceUpdate();
  }

  // render --------------------------------------------------------------------

  renderEmojiSelect = () => {
    if (this.state.emojiSelectActive === false) { return; }

    return (
      <div id="emoji-select-row">
        <div id="emoji-select-backdrop" onMouseLeave={(e) => e.stopPropagation()} onClick={this.onClick_toggleEmojiSelect}></div>
        <div id="emoji-select-container">
          <EmojiSelect/>
        </div>
      </div>
    )
  }


  render() {
    return (
      <div id="ChatInput">
        {this.renderEmojiSelect()}
        <div id="text-input-row">
          <div id="text-area-container">
            <AdjustableTextArea
              text       = {this.state.text}
              updateText = {(newText) => {this.setState({text: newText})}}
              submitText = {this.sendText}
              />
          </div>
          {(this.state.text.length === 0) && <div id="attachments-button"></div>}
          <div id="emojis-button" onClick={this.onClick_toggleEmojiSelect}></div>
        </div>
      </div>
    );
  }
}


export default Chat;
