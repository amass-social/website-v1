// =============================================================================
// About: Sidebar.js
// =============================================================================
/*
  Sidebar contains <Sidebar/>, a component that:
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './Sidebar.css';

// images
import ICON_HOME_UNSELECTED    from '../../Images/icons/feed_icon.png';
import ICON_HOME_SELECTED      from '../../Images/icons/feed_icon_filled_white.png';
import ICON_LIBRARY_UNSELECTED from '../../Images/icons/library_icon.png';
import ICON_LIBRARY_SELECTED   from '../../Images/icons/library_icon_filled_white.png';
import ICON_CHAT_UNSELECTED    from '../../Images/icons/chat_icon.png';
import ICON_ACCOUNT_UNSELECTED from '../../Images/icons/account_icon.png';
import ICON_ACCOUNT_SELECTED   from '../../Images/icons/account_icon_filled_white.png';
import ICON_FRIENDS_UNSELECTED from '../../Images/icons/friends_icon.png';
import ICON_FRIENDS_SELECTED   from '../../Images/icons/friends_icon_filled_white.png';

// =============================================================================
// <Sidebar/>
// =============================================================================

class Sidebar extends React.Component {

  renderTab = (tabName, iconSelected, iconUnselected) => {
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
            {this.renderTab("home", ICON_HOME_SELECTED, ICON_HOME_UNSELECTED)}
            {this.renderTab("library", ICON_LIBRARY_SELECTED, ICON_LIBRARY_UNSELECTED)}
            {this.renderTab("friends", ICON_FRIENDS_SELECTED, ICON_FRIENDS_UNSELECTED)}
            {this.renderTab("account", ICON_ACCOUNT_SELECTED, ICON_ACCOUNT_UNSELECTED)}
          </div>
          <button id="new-post-button">New Post</button>
          <button
            id={(this.props.selectedPage === 'settings') ? "settings-button-selected" : "settings-button"}
            onClick={() => this.props.selectPage('settings')}
            >Settings
          </button>
        </div>
        <div id="bottom-container">
          <div id="chat-title-row">
            <h2>Chats</h2>
            <img id="chat-icon" src={ICON_CHAT_UNSELECTED} alt="chat-icon"/>
          </div>
          <div id="chat-container">
            <p>pinned chats...</p>
            <p>chats will go here...</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
