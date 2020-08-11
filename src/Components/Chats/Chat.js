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
      text: ""
    };
  }

  // sends the user's message and wipes state
  sendText = (textToSend) => {
    this.setState({text: ""});
  }

  // render --------------------------------------------------------------------

  render() {
    return (
      <div id="ChatInput">
        <div id="text-area-container">
          <AdjustableTextArea
            text       = {this.state.text}
            updateText = {(newText) => {this.setState({text: newText})}}
            submitText = {this.sendText}
            />
        </div>
        {(this.state.text.length === 0) && <div id="attachments-button"></div>}
        <div id="emojis-button"></div>
      </div>
    );
  }
}


// =============================================================================
// <AdjustableTextArea/>
// =============================================================================



class AdjustableTextArea extends React.Component {

  constructor() {
    super();
    this.lineHeight = 20; // <- how tall a standard line of text is in our <textarea/>
    this.dimensionParams = ['width', 'height'];
    let dimensions = {};
    for (let i = 0; i < this.dimensionParams.length; i++) {
      dimensions[this.dimensionParams[i]] = 0;
    }
    this.state = {
      shiftActive : false,
      dimensions  : dimensions
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


  // gets the dimensions of this component and positioning data according to the viewport
  // following: https://www.pluralsight.com/tech-blog/getting-size-and-position-of-an-element-in-react/
  extractDimensions = (el) => {
    if (!el) { return; }

    let dim               = el.getBoundingClientRect();
    let changeFound       = false;
    let updatedDimensions = {};
    for (let i = 0; i < this.dimensionParams.length; i++) {
      let key = this.dimensionParams[i];
      updatedDimensions[key] = dim[key];
      if (dim[key] !== this.state.dimensions[key]) {
        changeFound = true;
      }
    }

    if (changeFound) {
      this.setState({
        dimensions: updatedDimensions
      });
    }
  }

  // the user typed something into the input
  // -> we need to check if they pressed 'enter' to send the message or 'shift+enter' to newline
  // -> also need to be aware that a user deleting text up to a '\n' doesn't count as pressing enter
  updateText = (e) => {
    let text = e.target.value;

    // in case user deletes all the text, we want to resize our input
    if (text.length === 0) {
      this.setState({dimensions: {width: 0, height: 0}});
      this.props.updateText(text);
      return;
    }

    // otherwise, we want to either update text or 'send' the message
    if (text !== this.props.text) {
      if (
        (text.length > 2)                  &&
        (text[text.length - 1] === "\n")   &&
        (this.state.shiftActive === false) &&
        (text.length > this.props.text.length)) {

        this.props.submitText(text.trim()); // remove trailing/leading whitespace
      } else {
        this.props.updateText(text);
      }
    }
  }


  // we render an invisible div w/ the same text styling as our areatext
  renderInvisibleTextContainer = () => {

    // in the case where we have a trailing newline, we want to add a renderable character
    // to make this visible to the div
    let text = this.props.text;
    if (text.length === 0) {
      text = '.';
    }
    if (text[text.length - 1] === '\n') {
      text = `${text}.`;
    }

    return (
      <div
        id="invisible-text-container"
        className="spacing-details"
        style={{'max-height': `${this.lineHeight * this.props.lineLimit}px`}}
        ref={(el) => this.extractDimensions(el)}>
        {text}
      </div>
    );
  }


  render() {
    return (
      <div id="AdjustableTextArea">
        {this.renderInvisibleTextContainer()}
        <textarea
          id="text-input"
          className="spacing-details"
          style={{'height': `${this.state.dimensions.height}px`}}
          value={this.props.text}
          onChange={this.updateText}
          />
      </div>
    )
  }
}


AdjustableTextArea.defaultProps = {
  lineLimit: 6 // <- the number of lines that the <textarea/> can expand to
};

export default Chat;
