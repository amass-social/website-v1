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

// npm
import RenderEmoji from 'react-easy-emoji';

// components
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
    this.childTextArea = React.createRef(); // <- create this ref so we can call <AdjustableTextArea/>.addSubstringToText() for emojis
  }

  // sends the user's message and wipes state
  sendText = (textToSend) => {
    console.log(`sending: ${textToSend}`);
    this.setState({text: "", emojiSelectActive: false});
  }

  onClick_toggleEmojiSelect = () => {
    if (this.state.emojiSelectActive === true) {
      this.childTextArea.current.focusOnTextArea();
    }
    this.setState({emojiSelectActive: !this.state.emojiSelectActive});
  }

  addEmojiToText = (emojiUnicode) => {
    let newText = this.childTextArea.current.addSubstringToText(emojiUnicode);
    this.setState({text: newText, emojiSelectActive: false});
    this.childTextArea.current.focusOnTextArea();
  }



  // render --------------------------------------------------------------------

  renderEmojiSelect = () => {

    if (this.state.emojiSelectActive === false) {
      return (
        <div id="emoji-select-anchor"></div>
      )
    }

    return (
      <div id="emoji-select-anchor">
        <div id="emoji-select-backdrop" onMouseLeave={(e) => e.stopPropagation()} onClick={this.onClick_toggleEmojiSelect}></div>
        <div id="emoji-select-container">
          <EmojiSelect selectEmoji={this.addEmojiToText}/>
        </div>
      </div>
    );
  }


  render() {
    let renderEmojiButtonText = (this.state.emojiSelectActive) ? '😀' : '🙂';
    return (
      <div id="ChatInput">
        <div id="text-input-row">
          <div id="text-area-container">
            <AdjustableTextArea
              ref        = {this.childTextArea}
              text       = {this.state.text}
              updateText = {(newText) => {this.setState({text: newText})}}
              submitText = {this.sendText}
              />
          </div>
          {(this.state.text.length === 0 && false) && <div id="attachments-button"></div>}
          <div id="emojis-button" onClick={this.onClick_toggleEmojiSelect}>{RenderEmoji(renderEmojiButtonText)}</div>
          {this.renderEmojiSelect()}
        </div>
      </div>
    );
  }
}


export default Chat;
