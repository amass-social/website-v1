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
            />
        </div>
      );
    }
    return tabsToRender;
  }


  render() {
    return (
      <div id="ChatList">
        <div id="chat-title-row">
          <h2>Chats</h2>
          <img id="chat-icon" src={ICON_CHAT_UNSELECTED} alt="chat-icon"/>
        </div>
        <div id="chats-container">
          <div id="chats-container-scroll">
            {this.renderChatTabs()}
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
    this.popupWidth  = 400;
    this.popupHeight = 600;
    let dimensions = {};
    for (let i = 0; i < this.dimensionParams.length; i++) {
      dimensions[this.dimensionParams[i]] = 0;
    }
    this.state = {
      hoverActive: false,
      dimensions: dimensions
    };
  }


  onMouseEnter = (e) => {
    this.setState({
      hoverActive: true,
    })
  }


  onMouseLeave = () => {
    this.setState({
      hoverActive: false
    });
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
    if (this.state.hoverActive === false || this.props.selected === true) { return; }

    // get location of the popup to be rendered position:fixed
    let xLocation = this.state.dimensions.width + this.state.dimensions.left;
    let yLocation = this.state.dimensions.height + this.state.dimensions.top - this.popupHeight/2;
    yLocation = (yLocation + this.popupHeight > window.innerHeight - 10) ? window.innerHeight - this.popupHeight - 10 : yLocation;
    yLocation = (yLocation < 10) ? 10 : yLocation;

    return (
      <div id="popup-container" style={{
          'left'  : xLocation,
          'top'   : yLocation,
          'height': `${this.popupHeight}px`,
          'width' : `${this.popupWidth}px`
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
    if (this.state.hoverActive) { containerCSS = 'hovered'; }
    if (this.props.selected)    { containerCSS = 'selected'; }

    return (
      <div
        id="ChatTab"
        className={containerCSS}
        onClick={() => this.props.selectChat(this.props.chatId)}
        onMouseEnter={(e) => this.onMouseEnter(e)}
        onMouseLeave={this.onMouseLeave}
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
