// =============================================================================
// About: ChatList.js
// =============================================================================
/*
  ChatList contains <ChatList/>, a component that:
    - is used to render a vertical list of chats (represented by <ChatTab/>)
    - these are interactive, so hovering over a <ChatTab/> will render a <ChatPopup/>
    -   and clicking a <ChatTab/> will take the user to a <ChatPage/>

  ChatList also contains <ChatTab/>, a component that:
    - represents a single chat in the <ChatList/>
    - when the user hovers over a <ChatTab/>, it will render a <ChatPopup/> with additional details about the chat
    - when the user clicks a <ChatTab/>, it will select the chat page

  ChatList also contains <ChatPopup/>, a component that:
    - shows at-a-glance information about a chat, including:
      -> the participants in the convo
      -> the original post that was shared that the conversation started from
      -> the recent messages in the chat
      -> the ability to send a message directly from the popup
    - This component is rendered by <ChatTab/>
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './ChatList.css';

// components
import Chat from './Chat.js';

// images
import ICON_CHAT_UNSELECTED    from '../../Images/icons/chat_icon.png';


// =============================================================================
// <ChatList/>
// =============================================================================

class ChatList extends React.Component {

  constructor() {
    super();
    this.state = {
      hoveredChat: ''
    };
  }

  setHoveredChat = (chatId) => {
    if (this.state.hoveredChat !== chatId) {
      this.setState({hoveredChat: chatId});
    }
  }

  clearHovered = () => {
    this.setHoveredChat('');
  }


  renderChatTabs = () => {
    let tabsToRender = [];
    for (let i = 0; i < this.props.chats.length; i++) {
      let chatObj = this.props.chats[i];
      tabsToRender.push(
        <div className="chat-tab-container">
          <ChatTab
            chatId     = {chatObj.id}
            title      = {chatObj.title}
            selectChat = {this.props.selectChat}
            selected   = {(chatObj.id === this.props.selectedChatId)}
            setHovered = {() => this.setHoveredChat(chatObj.id)}
            hovered    = {(chatObj.id === this.state.hoveredChat)}
            />
        </div>
      );
    }
    return tabsToRender;
  }


  render() {
    return (
      <div id="ChatList" onMouseLeave={this.clearHovered}>
        <div id="chat-title-row" onMouseEnter={this.clearHovered}>
          <h2>Chats</h2>
          <img id="chat-icon" src={ICON_CHAT_UNSELECTED} alt="chat-icon"/>
        </div>
        <div id="chats-container">
          <div id="chats-container-scroll">
            {this.renderChatTabs()}
            <div id="invisible-hover-boundary" onMouseEnter={this.clearHovered}></div>
          </div>
        </div>
      </div>
    );
  }
}


// =============================================================================
// <ChatTab/>
// =============================================================================

class ChatTab extends React.Component {

  constructor() {
    super();
    this.dimensionParams =  ['x', 'y', 'width', 'height', 'top', 'left'];
    this.popupWidth   = 400;
    this.popupHeight  = 600;
    this.popupPadding = 75; // <- how much extra space to the top/right/bottom of the popup still counts as "hovering"
    this.popupMargins = 10; // <- minimum distance the popup can get from the border of the browser viewbox
    let dimensions = {};
    for (let i = 0; i < this.dimensionParams.length; i++) {
      dimensions[this.dimensionParams[i]] = 0;
    }
    this.state = {
      dimensions: dimensions
    };
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


  // render --------------------------------------------------------------------

  renderPopup = () => {
    if (this.props.hovered === false || this.props.selected === true) { return; }

    // get location of the popup to be rendered position:fixed
    // yLocation cases:
    //  1) popup isn't low enough for the padding-bottom to change from default
    //  2) popup is low enough that the padding-bottom should be shrinked to respect margin
    //  3) popup is too low for margin, so the padding should be 0 and the location should be set to margin
    //  4) popup is too high, set to margin
    let height = this.popupHeight + this.popupPadding * 2;
    let heightNoBottomPadding = this.popupHeight + this.popupPadding;
    let xLocation = this.state.dimensions.width + this.state.dimensions.left;
    let padding = {
      'top'    : this.popupPadding,
      'right'  : this.popupPadding,
      'bottom' : this.popupPadding,
      'left'   : 20,
    }

    let yLocation = this.state.dimensions.height + this.state.dimensions.top - height/2; // case 1)
    if (yLocation + heightNoBottomPadding > window.innerHeight - this.popupMargins) {
      yLocation = window.innerHeight + this.popupPadding - height - this.popupMargins; // case 3)
      padding['bottom'] = this.popupMargins;
    } else if (yLocation + height > window.innerHeight - this.popupMargins) {
      padding['bottom'] = window.innerHeight - this.popupMargins - yLocation - heightNoBottomPadding; // case 2)
    }
    if (yLocation < this.popupMargins) {
      yLocation = 0;                      // case 4)
      padding['top'] = this.popupMargins;
    }


    return (
      <div id="popup-container" style={{
          'left'          : xLocation,
          'top'           : yLocation,
          'height'        : `${this.popupHeight}px`,
          'width'         : `${this.popupWidth}px`,
          'paddingTop'    : `${padding['top']}px`,
          'paddingRight'  : `${padding['right']}px`,
          'paddingBottom' : `${padding['bottom']}px`,
          'paddingLeft'   : `${padding['left']}px`
        }}
        onClick={(e) => e.stopPropagation() /* prevents parent <ChatTab/> from being influenced by clicks to popup*/}>
        <div id="popup-content-container">
          <ChatPopup/>
        </div>
      </div>
    );
  }


  render() {
    let containerCSS = '';
    if (this.props.hovered)  { containerCSS = 'hovered'; }
    if (this.props.selected) { containerCSS = 'selected'; }

    return (
      <div
        id="ChatTab"
        className={containerCSS}
        onClick={() => this.props.selectChat(this.props.chatId)}
        onMouseEnter={this.props.setHovered}
        ref={(el) => this.extractDimensions(el)}>

        <div id="left-container">
          <div id="img-container"></div>
          <div id="text-container">
            <p id="chat-title" className="text">{this.props.title} yadayada yada yada</p>
            <p id="participants-text" className="text">participant name</p>
          </div>
        </div>
        <div id="alert-container">
          <p>100</p>
        </div>

        {this.renderPopup()}
      </div>
    );
  }
}


// =============================================================================
// <ChatPopup/>
// =============================================================================

class ChatPopup extends React.Component {
  render() {
    return(
      <div id="ChatPopup">
        <div id="top-container">
          <div id="participants-container">
            <div className="group">
              <div id="participants-icons-container">
              </div>
              <h3>participants</h3>
            </div>
            <div className="group">
              <h3 id="open-menu-button">&#8942;</h3>
            </div>
          </div>
          <div id="about-post-container">
            <div id="post-image-container">
              <div id="post-image"></div>
            </div>
            <div id="post-title-container">
              <h3>title</h3>
              <p>domain</p>
            </div>
          </div>
        </div>
        <div id="messages-container">
          <Chat/>
        </div>
      </div>
    )
  }
}


export default ChatList;
