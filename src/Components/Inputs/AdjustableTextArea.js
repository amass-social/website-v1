// =============================================================================
// About: AdjustableTextArea.js
// =============================================================================
/*
  AdjustableTextArea is a component which:
    - is used whenever a user needs to type in text that could include newlines
    - it starts off being the height of 1 line and grows taller as needed, with a max height given through props
    - the text value is passed in through props (along with a function to edit that text)
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './AdjustableTextArea.css';

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
      shiftActive    : false,
      dimensions     : dimensions,
      cursorLocation : 0
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


  // keeps track of the location of the cursor within the <textarea/>
  setCursorLocation = (el) => {
    if (!el) { return; }
    if (el.selectionStart !== this.state.cursorLocation) {
      this.setState({cursorLocation: el.selectionStart});
    }
  }

  // this function can be called by a parent (using a ref), allowing emojis to be inserted at the right location
  addSubstringToText = (substring) => {
    let str1 = this.props.text.substring(0, this.state.cursorLocation);
    let str2 = this.props.text.substring(this.state.cursorLocation, this.props.text.length);
    return `${str1}${substring}${str2}`;
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
          ref={(el) => this.setCursorLocation(el)}
          />
      </div>
    )
  }
}


AdjustableTextArea.defaultProps = {
  lineLimit: 6 // <- the number of lines that the <textarea/> can expand to
};


export default AdjustableTextArea;
