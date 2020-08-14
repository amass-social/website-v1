// =============================================================================
// About: EmojiSelect.js
// =============================================================================
/*
  EmojiSelect contains <EmojiSelect/>, a component that:
    - lets the user select an emoji
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './EmojiSelect.css';

// npm packages
import RenderEmoji from 'react-easy-emoji';


// Constants -------------------------------------------------------------------

const DEFINITIONS = require('../../Constants/Emojis/definitions.json');
// const CATEGORIES  = require('../../Constants/Emojis/categories.json');

// =============================================================================
// <EmojiSelect/>
// =============================================================================

class EmojiSelect extends React.Component {

  constructor() {
    super();
    this.state = {
      selectSkinColorActive : false,
      hoveredEmojiId        : ''
    };
  }

  // Input ---------------------------------------------------------------------

  onClick_selectSkinColor = () => {
    this.setState({selectSkinColorActive: false});
  }

  onMouseHoverEmoji = (emojiId) => {
    if (this.state.hoveredEmojiId !== emojiId) {
      this.setState({hoveredEmojiId: emojiId});
    }
  }

  // Render --------------------------------------------------------------------

  renderSelectEmojiColor = () => {
    if (this.state.selectSkinColorActive === true) {
      let optionsToRender = [];
      for (let i = 0; i < 5; i++) {
        optionsToRender.push(
          <div id="select-emoji-color-button" onClick={() => this.onClick_selectSkinColor()}></div>
        )
      }
      return (
        <div id="skin-color-options-container">
          {optionsToRender}
        </div>
      );
    }

    return (
      <div id="skin-color-options-container">
        <div id="select-emoji-color-button" onClick={() => this.setState({selectSkinColorActive: true})}></div>
      </div>
    );
  }


  renderCurrentlyHoveredEmoji = () => {
    if (this.state.selectSkinColorActive === true) { return (<div id="hovered-emoji-missing"></div>); }

    if (this.state.hoveredEmojiId === '') {
      return (
        <div id="hovered-emoji-container">
          <div id="hovered-emoji-missing"></div>
        </div>
      );
    }

    let emoji = DEFINITIONS[this.state.hoveredEmojiId]['default']['emoji'];
    return (
      <div id="hovered-emoji-container">
        <div id="hovered-emoji">{RenderEmoji(`${emoji}`)}</div>
        <p id="hovered-emoji-title">{this.state.hoveredEmojiId}</p>
      </div>
    );
  }


  renderTopBar = () => {
    let categoriesToRender = [];
    for (let i = 0; i < 9; i++) {
      categoriesToRender.push(
        <div id="emoji-category-button"></div>
      );
    }
    return (
      <div id="top-container">
        <div id="search-bar-container">
          <input id="search-bar" placeholder="Search Emojis..."/>
        </div>
        <div id="emoji-category-container">
          {categoriesToRender}
        </div>
      </div>
    );
  }


  renderEmojis = () => {
    let emojisToRender = [];
    for (let emojiId in DEFINITIONS) {
      let emoji = RenderEmoji(DEFINITIONS[emojiId]['default']['emoji']);
      emojisToRender.push(
        <p id="emoji" onMouseEnter={() => this.onMouseHoverEmoji(emojiId)}>
          {emoji}
        </p>
      );
      if (emojisToRender.length === 50) {
        return emojisToRender;
      }
    }
  }

  render() {
    return (
      <div id="EmojiSelect">
        {this.renderTopBar()}
        <div id="middle-container">
          {this.renderEmojis()}
        </div>
        <div id="bottom-container">
          {this.renderCurrentlyHoveredEmoji()}
          {this.renderSelectEmojiColor()}
        </div>
      </div>
    );
  }
}

export default EmojiSelect;
