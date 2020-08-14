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


// =============================================================================
// <EmojiSelect/>
// =============================================================================

class EmojiSelect extends React.Component {

  constructor() {
    super();
    this.state = {
      selectSkinColorActive: false
    };
  }

  // Input ---------------------------------------------------------------------

  onClick_selectSkinColor = () => {
    this.setState({selectSkinColorActive: false});
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
    if (this.state.selectSkinColorActive === true) { return (<div></div>); }

    return (
      <div id="hovered-emoji-container">
        <div id="hovered-emoji"></div>
        <p id="hovered-emoji-title">title</p>
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

  render() {
    return (
      <div id="EmojiSelect">
        {this.renderTopBar()}
        <div id="middle-container"></div>
        <div id="bottom-container">
          {this.renderCurrentlyHoveredEmoji()}
          {this.renderSelectEmojiColor()}
        </div>
      </div>
    );
  }
}

export default EmojiSelect;
