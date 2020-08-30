// =============================================================================
// About: Reactions.js
// =============================================================================
/**
  1) Reactions contains <Reactions/>, a component that:
    - handles user's reactions to posts.

    <Reactions/>'s Props:
      @param {string[]} reactions

    <Reactions/>'s Children:
      - <Reaction/>

    <Reactions/>'s Parents:
      - <PostContent/>
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './Reactions.css';

// images
import ADD_EMOJI_ICON from '../../Images/icons/add-reaction.svg';
import EmojiSelect from '../Inputs/EmojiSelect.js';


// =============================================================================
// <Reactions/>
// =============================================================================

class Reactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frequencies: {},
      emojiSelectIsShowing: false,
      emojiWindowX: 0,
      emojiWindowY: 0,
      emojiWindowWidth: 300,
      emojiWindowHeight: 400
    }
  }

  componentWillMount() {
    this.updateFrequencyList();
  }

  updateFrequencyList = () => {
    /**
     * Creates/Updates a frequency list of all the reactions for a post.
     * @example
     * // returns {🙃: 3}
     * updateFrequencyList([🙃, 🙃, 🙃])
     */
    let tempFreq = {};
    for (let i = 0; i < this.props.reactions.length; ++i) {
      if (this.props.reactions[i] in tempFreq) {
        tempFreq[this.props.reactions[i]]++;
      } else {
        tempFreq[this.props.reactions[i]] = 1;
      }
    }

    this.setState({frequencies: tempFreq})
  }

  toggleEmojiSelect = () => {
    /**
     * Toggles if the emoji select window should be shown.
     */
    this.setState({emojiSelectIsShowing: !this.state.emojiSelectIsShowing});
  }

  showEmojiSelect = (x, y) => {
    /**
     * Shows the emoji select window at the position where the button was clicked.
     * @param {number} x The x position of the mouse click in pixels
     * @param {number} y The y position of the mouse click in pixels
     */
    this.toggleEmojiSelect();
    this.setState({
      emojiWindowX: x,
      emojiWindowY: y
    });
  }

  addReaction = (emoji) => {
    /**
     * Adds an emoji to the list of reactions.
     * @param {string} emoji The emoji character to add to the list of reactions
     */
    let temp = this.state.frequencies;
    if (emoji in this.state.frequencies) {
      temp[emoji]++;
    } else {
      temp[emoji] = 1;
    }

    this.setState({frequencies: temp});
  }

  renderEmojiSelect = () => {
    if (this.state.emojiSelectIsShowing) {
      return (
        <>
          <div 
            id="emoji-select-backdrop" 
            onMouseLeave={(e) => e.stopPropagation()} 
            onClick={this.toggleEmojiSelect}>
          </div>

          <div 
            id="emoji-select-container"
            style={  
            /**
             * Display the emoji window at the mouse click pos of the emoji
             * toggle button
             * @see showEmojiSelect
             */
            {
              width: this.state.emojiWindowWidth,
              height: this.state.emojiWindowHeight,
              top: this.state.emojiWindowY - this.state.emojiWindowHeight,
              left: this.state.emojiWindowX - this.state.emojiWindowWidth
            }}  
          >
            <EmojiSelect selectEmoji={emoji => this.addReaction(emoji)}/>
          </div>
      </>
      )
    }
  }

  render() {
    return (
      <div class="reactions">
        {Object.keys(this.state.frequencies).map( emoji => {
          return (
            <Reaction 
              emoji           = {emoji} 
              count           = {this.state.frequencies[emoji]}
              incrementCount  = {() => this.addReaction(emoji)}
            />
          )
        })}

        {this.renderEmojiSelect()}

        <input
          class='emoji-select-button'
          type='image' 
          src={ADD_EMOJI_ICON}  
          onClick={(e) => this.showEmojiSelect(e.clientX, e.clientY)}
          alt=''
        />
      </div>
    );
  }
}


// =============================================================================
// <Reaction/>
// =============================================================================

class Reaction extends React.Component {
  render() {
    return (
      <div id='Reaction' onClick={() => this.props.incrementCount()}>
        <span class='emoji'>{this.props.emoji}</span>
        <div class='counter'>{this.props.count}</div>
      </div>
    );
  }
}

export default Reactions;
