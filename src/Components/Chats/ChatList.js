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
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './ChatList.css';

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
            title={chatObj.title}
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
  render() {
    return (
      <div id="ChatTab" className="hoverable">
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
      </div>
    );
  }
}


export default ChatList;
