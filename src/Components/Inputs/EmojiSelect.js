// =============================================================================
// About: EmojiSelect.js
// =============================================================================
/*
  1) EmojiSelect contains <EmojiSelect/>, a component that:
    - lets the user select an emoji

    <EmojiSelect/>'s Props:
      - selectEmoji : FUNCTION
        -> takes the selected emoji and inserts it wherever needed in the parent

    <EmojiSelect/>'s Children:
      - n/a

    <EmojiSelect/>'s Parents:
      - <ChatInput/>
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
    this.searchInputRef = React.createRef(); // <- so that the search can be auto-focused on
    this.emojiScrollBox = React.createRef(); // so that outside scrolling can be prevented
    this.state = {
      selectSkinColorActive : false,
      hoveredEmojiId        : '',
      searchText            : ''
    };
  }

  componentDidMount = () => {
    this.searchInputRef.current.focus();


    /* Scrolling */
    /**
     * Initialize scrollTop so that when the container is first loaded it
     * will detect a scroll event. If the scrollTop was set to 0 and the
     * container was scolled up, it would not detect a scroll event but still
     * scroll background containers.
     */
    this.emojiScrollBox.current.scrollTop = 1;
    this.emojiScrollBox.current.addEventListener('scroll',
      this.preventOutsideScrolling,
      false
    );
  }

  componentWillUnmount = () => {
    this.emojiScrollBox.current.removeEventListener('scroll', 
      this.preventOutsideScrolling, 
      false
    );
  }

  // Scrolling -----------------------------------------------------------------

  preventOutsideScrolling = () => {
    /**
     * Prevents scrolling of containers outside the EmojiSelect window.
     * Once the window is scrolled to the bottom or top set the scrollTop back
     * to the inside of the container, preventing it ever actually reaching the
     * top or bottom of the container.
     */
    let scrollTop = this.emojiScrollBox.current.scrollTop;
    let scrollHeight = this.emojiScrollBox.current.scrollHeight;
    let offsetHeight = this.emojiScrollBox.current.offsetHeight;
    let contentHeight = scrollHeight - offsetHeight;

    console.log(scrollTop, scrollHeight, offsetHeight, contentHeight);

    if (contentHeight <= scrollTop) {  // Box is scrolled to the bottom
      this.emojiScrollBox.current.scrollTop = contentHeight - 1;
    } else if (scrollTop === 0) {  // Box is scrolled to the top
      this.emojiScrollBox.current.scrollTop = 1;
    }

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


  // The top bar of <EmojiSelect/> contains:
  //  1) a search bar for filtering emojis by name
  //  2) a row of categories that the user can click to jump to
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
          <input
            id="search-bar"
            ref={this.searchInputRef}
            placeholder="Search Emojis..."
            value={this.state.searchText}
            onChange={(e) => this.setState({'searchText': e.target.value})}/>
        </div>
        <div id="emoji-category-container">
          {categoriesToRender}
        </div>
      </div>
    );
  }


  // renders the emojis that match the current search constraints
  // -> if the user hasn't added any search constraints, renders a list of all emojis (sorted by category)
  renderEmojis = () => {
    let searchText = this.state.searchText.toLowerCase();
    let emojisToRender = [];
    for (let emojiId in DEFINITIONS) {
      if ('default' in DEFINITIONS[emojiId]) {
        let emojiTitle = DEFINITIONS[emojiId]['default']['title'].toLowerCase();
        if ((this.state.searchText === '') || (emojiTitle.indexOf(searchText) >= 0)) {
          let emojiUnicode = DEFINITIONS[emojiId]['default']['emoji'];
          let emojiRendered = RenderEmoji(emojiUnicode);
          emojisToRender.push(
            <p
              id="emoji"
              onMouseEnter={() => this.onMouseHoverEmoji(emojiId)}
              onClick={() => this.props.selectEmoji(emojiUnicode)}>
              {emojiRendered}
            </p>
          );
        }
      }
      if (emojisToRender.length > 60) {
        break;
      }
    }
    return emojisToRender;
  }

  render() {
    return (
      <div id="EmojiSelect">
        {this.renderTopBar()}
        <div id="middle-container" ref={this.emojiScrollBox}>
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
