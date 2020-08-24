// =============================================================================
// About: Sidebar.js
// =============================================================================
/*
  1) Sidebar contains <Sidebar/>, a component that:
    - Acts as the main navigational area of the website
    - It shows the user what page they are currently focused on and lets them select a new one
    - It also contains a list of chats that the user can interact with
    - The <Sidebar/> is used for the desktop version of the website and isn't meant for mobile

    <Sidebar/>'s' Props:
      - selectedPage   : TEXT
        -> the text ID of the currently selected page
      - selectPage     : FUNCTION
        -> a function to select a page (which changes what content gets rendered on the website)
      - selectedChatId : TEXT
        -> the text ID of the currently selected chat, "" if none are selected
      - selectChat     : FUNCTION
        -> function to select a chat

    <Sidebar/>'s Children:
      - <ChatList/>
        -> For rendering the chats in the sidebar

    <Sidebar/>'s Parents:
      - <DesktopLayout/>
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './Sidebar.css';

// components
import ChatList from '../Chats/ChatList.js';

// images
import ICON_HOME_UNSELECTED    from '../../Images/icons/feed_icon.png';
import ICON_HOME_SELECTED      from '../../Images/icons/feed_icon_filled_white.png';
import ICON_LIBRARY_UNSELECTED from '../../Images/icons/library_icon.png';
import ICON_LIBRARY_SELECTED   from '../../Images/icons/library_icon_filled_white.png';
import ICON_ACCOUNT_UNSELECTED from '../../Images/icons/account_icon.png';
import ICON_ACCOUNT_SELECTED   from '../../Images/icons/account_icon_filled_white.png';
import ICON_FRIENDS_UNSELECTED from '../../Images/icons/friends_icon.png';
import ICON_FRIENDS_SELECTED   from '../../Images/icons/friends_icon_filled_white.png';

// Constants -------------------------------------------------------------------

let CHATS = [];
for (let i = 0; i < 30; i++) {
  CHATS.push({'title': `chat #${i}`, 'id': `chatid=${i}`});
}


// =============================================================================
// <Sidebar/>
// =============================================================================

class Sidebar extends React.Component {

  renderNavTab = (tabName, iconSelected, iconUnselected) => {
    if (tabName === this.props.selectedPage) {
      return (
        <div id="selected-tab">
          <img className="icon" src={iconSelected} alt="icon"/>
          <h4>{tabName}</h4>
        </div>
      );
    } else {
      return (
        <div className="tab" onClick={() => this.props.selectPage(tabName)}>
          <img className="icon" src={iconUnselected} alt="icon"/>
          <h4>{tabName}</h4>
        </div>
      );
    }
  }


  render() {
    return (
      <div id="Sidebar">
        <div id="top-container">
          <h1 id="amass-title-text">amass!</h1>
          <div id="nav-container">
            {this.renderNavTab("home", ICON_HOME_SELECTED, ICON_HOME_UNSELECTED)}
            {this.renderNavTab("library", ICON_LIBRARY_SELECTED, ICON_LIBRARY_UNSELECTED)}
            {this.renderNavTab("friends", ICON_FRIENDS_SELECTED, ICON_FRIENDS_UNSELECTED)}
            {this.renderNavTab("account", ICON_ACCOUNT_SELECTED, ICON_ACCOUNT_UNSELECTED)}
          </div>
          <button id="new-post-button">New Post</button>
          <button
            id={(this.props.selectedPage === 'settings') ? "settings-button-selected" : "settings-button"}
            onClick={() => this.props.selectPage('settings')}
            >Settings
          </button>
        </div>
        <div id="bottom-container">
          <ChatList
            chats          = {CHATS}
            selectChat     = {this.props.selectChat}
            selectedChatId = {this.props.selectedChatId}
            />
        </div>
      </div>
    );
  }
}

export default Sidebar;
