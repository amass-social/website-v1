// =============================================================================
// About: MobileLayout.js
// =============================================================================
/*
  MobileLayout contains <MobileLayout/>, a component that:
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
          <MobileNavbar selectedPage={this.props.selectedPage} selectPage={this.props.selectPage}/>
        </div>

        <div id="main-content-container">
          <p>Component: MobileLayout</p>
        </div>
      </div>
    );
  }
}

export default MobileLayout;
