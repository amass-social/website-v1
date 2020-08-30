// =============================================================================
// About: Reactions.js
// =============================================================================
/**
  1) Reactions contains <Reactions/>, a component that:
    - ...

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
      emojiSelectIsShowing: false
    }
  }

  componentWillMount() {
    this.updateFrequencyList();
  }

  updateFrequencyList = () => {
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

  renderEmojiSelect = () => {
    if (this.state.emojiSelectIsShowing) {
      return (
        <EmojiSelect />
      )
    }
  }

  showEmojiSelect = () => {
    this.setState({emojiSelectIsShowing: true});
  }

  render() {
    return (
      <div class="reactions">
        {this.renderEmojiSelect()}
        <input type='image' src={ADD_EMOJI_ICON} height='30px' onClick={(e) => this.showEmojiSelect()}/>
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
      <div id="Reaction">
        <span class="reaction">{}</span>
      </div>
    );
  }
}

export default Reactions;
