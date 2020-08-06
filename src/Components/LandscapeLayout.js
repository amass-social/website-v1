// =============================================================================
// About: LandscapeLayout.js
// =============================================================================
/*
  LandscapeLayout contains <LandscapeLayout/>, a component that:
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './LandscapeLayout.css';


// =============================================================================
// <LandscapeLayout/>
// =============================================================================

class LandscapeLayout extends React.Component {

  // render --------------------------------------------------------------------

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
      <div id="LandscapeLayout">
        <div id="sidebar-container">
          <div id="top-container">
            <h1 id="amass-title-text">amass!</h1>
            <div id="nav-container">
              {this.renderTab("home")}
              {this.renderTab("library")}
              {this.renderTab("friends")}
              {this.renderTab("account")}
            </div>
            <button id="new-post-button">New Post</button>
          </div>
          <div id="bottom-container">
            <h2>Chats</h2>
            <div id="chat-container">
              <p>pinned chats...</p>
              <p>chats will go here...</p>
            </div>
          </div>
        </div>
        <div id="main-content-container"></div>
      </div>
    );
  }
}

export default LandscapeLayout;
