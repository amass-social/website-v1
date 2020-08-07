// =============================================================================
// About: Sidebar.js
// =============================================================================
/*
  Sidebar contains <Sidebar/>, a component that:
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './Sidebar.css';


// =============================================================================
// <Sidebar/>
// =============================================================================

class Sidebar extends React.Component {

  renderTab = (tabName, icon) => {
    if (tabName === this.props.selectedPage) {
      return (
        <div id="selected-tab">
          <h4>{icon}{tabName}</h4>
        </div>
      );
    } else {
      return (
        <div className="tab" onClick={() => this.props.selectPage(tabName)}>
          <h4>{icon}{tabName}</h4>
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
            {this.renderTab("home")}
            {this.renderTab("library")}
            {this.renderTab("friends")}
            {this.renderTab("account")}
          </div>
          <button id="new-post-button">New Post</button>
          <button
            id={(this.props.selectedPage === 'settings') ? "settings-button-selected" : "settings-button"}
            onClick={() => this.props.selectPage('settings')}
            >Settings
          </button>
        </div>
        <div id="bottom-container">
          <h2>Chats</h2>
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
