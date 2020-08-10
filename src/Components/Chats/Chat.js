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
      text        : "",
      shiftActive : false
    };
  }


  componentDidMount() {
    document.addEventListener("keydown", this.registerShift, false);
    document.addEventListener("keyup", this.registerShift, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.registerShift, false);
    document.removeEventListener("keyup", this.registerShift, false);
  }

  // getting a keycode of 16 means the user pressed shift
  registerShift = (e) => {
    if (e.keyCode === 16) {
      this.setState({shiftActive: !this.state.shiftActive});
    }
  }

  // the user typed something into the input
  // -> we need to check if they pressed 'enter' to send the message or 'shift+enter' to newline
  // -> also need to be aware that a user deleting text up to a '\n' doesn't count as pressing enter
  updateText = (e) => {
    let text = e.target.value;
    if (text !== this.state.text) {
      if (
        (text.length > 2)                  &&
        (text[text.length - 1] === "\n")   &&
        (this.state.shiftActive === false) &&
        (text.length > this.state.text.length)) {

        // TODO: remove trailing and leading whitespace before sending the message
        alert(`this should send the message: ${text}`)
        this.setState({text: ""});
      } else {
        this.setState({text: e.target.value});
      }
    }
  }

  // render --------------------------------------------------------------------

  render() {
    return (
      <div id="ChatInput">
        <textarea
          id="text-input"
          style={{'height': `${this.state.text.split("\n", 5).length * 20}px`}}
          value={this.state.text}
          onChange={this.updateText}
          />
        {(this.state.text.length === 0) && <div id="attachments-button"></div>}
        <div id="emojis-button"></div>
      </div>
    );
  }
}

export default Chat;
