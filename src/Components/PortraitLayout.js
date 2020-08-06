// =============================================================================
// About: PortraitLayout.js
// =============================================================================
/*
  PortraitLayout contains <PortraitLayout/>, a component that:
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './PortraitLayout.css';

// components
import PortraitNavbar from './Navbar/PortraitNavbar.js';


// =============================================================================
// <PortraitLayout/>
// =============================================================================

class PortraitLayout extends React.Component {
  render() {
    return (
      <div id="PortraitLayout">
        <div id="top-container">
          <PortraitNavbar
            selectedPage = {this.props.selectedPage}
            selectPage   = {this.props.selectPage}
            />
        </div>

        <div id="body">
          <div id="sidebar-container">
            <div id="button-container">
              <button id="share-button">New Post</button>
            </div>
            <div id="chat-container">
              <p>pinned chats...</p>
              <p>active chats...</p>
            </div>
          </div>
          <div id="main-content-container"></div>
        </div>
      </div>
    );
  }
}

export default PortraitLayout;
