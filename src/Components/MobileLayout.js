// =============================================================================
// About: MobileLayout.js
// =============================================================================
/*
  1) MobileLayout contains <MobileLayout/>, a component that:
    - is used by <App/> to render the mobile version of the website

    <MobileLayout/>'s Props:
      - selectedPage : TEXT
        -> the text ID of the currently selected tab/page on the website
      - selectPage   : FUNCTION
        -> lets the user switch to a different tab/page

    <MobileLayout/>'s Children:
      - <MobileNavbar/>
        -> for letting the user navigate the main pages of the website

    <MobileLayout/>'s Parents:
      - <App/>
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './MobileLayout.css';

// components
import MobileNavbar from './Navbar/MobileNavbar.js';

// =============================================================================
// <MobileLayout/>
// =============================================================================

class MobileLayout extends React.Component {

  render() {
    return (
      <div id="MobileLayout">
        <div id="navbar-container">
          <MobileNavbar
            selectedPage={this.props.selectedPage}
            selectPage={this.props.selectPage}
            />
        </div>

        <div id="main-content-container">
          <p>Component: MobileLayout</p>
        </div>
      </div>
    );
  }
}

export default MobileLayout;
