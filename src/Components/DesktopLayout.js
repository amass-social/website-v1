// =============================================================================
// About: DesktopLayout.js
// =============================================================================
/*
  1) DesktopLayout contains <DesktopLayout/>, a component that:
    - is used by <App/> to render the desktop version of the site

    <DesktopLayout/>'s Props:
      - renderLandscape : BOOL
        -> if true, content is rendered in the center of screen and there is padding to left/right
        -> if false, renders <DesktopLayout/> with the sidebar all the way to the left of screen and content fills screen
      - selectedPage    : TEXT
        -> the text ID of the currently selected page. This is modified by the navigational <Sidebar/>
      - selectPage      : FUNCTION
        -> this function lets the user navigate to & select a new page to render. This is passed to <Sidebar/>
      - selectedChatId  : TEXT
        -> the text ID of the chat that is currently selected
        -> if no chat is selected, this is an empty string ""
      - selectChat      : FUNCTION
        -> this function lets the user select a chat

    <DesktopLayout/>'s Children:
      - <Sidebar/>
        -> navigational sidebar that sits on the left side of the window
        -> contains navbar tabs and a list of chats

    <DesktopLayout/>'s Parents:
      - <App/>
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './DesktopLayout.css';

// components
import Sidebar from './Navbar/Sidebar.js';
import Feed from './Feed/Feed.js';


// =============================================================================
// <DesktopLayout/>
// =============================================================================

class DesktopLayout extends React.Component {

  displaySelectedPage = () => {
    /**
     * Display the page selected by the tab in <Sidebar/>.
     */
    switch (this.props.selectedPage) {
      case 'home':      return <Feed/>;

      /** @todo Add components for their respective pages here */
      case 'library':
      case 'friends':
      case 'account':
      default:          return <p>Page not found.</p>
    }
  }

  render() {
    return (
      <div id="DesktopLayout">
        <div id={(this.props.renderLandscape) ? 'landscape' : 'portrait'}>
          <div id="sidebar-container">
            <Sidebar
              selectedPage   = {this.props.selectedPage}
              selectPage     = {this.props.selectPage}
              selectedChatId = {this.props.selectedChatId}
              selectChat     = {this.props.selectChat}
              />
          </div>
          <div id="main-content-container">
            {this.displaySelectedPage()}
          </div>
        </div>
      </div>
    );
  }
}

export default DesktopLayout;
