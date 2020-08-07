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
import Sidebar from './Navbar/Sidebar.js';


// =============================================================================
// <PortraitLayout/>
// =============================================================================

class PortraitLayout extends React.Component {
  render() {
    return (
      <div id="PortraitLayout">
        <div id="sidebar-container">
          <Sidebar selectedPage={this.props.selectedPage} selectPage={this.props.selectPage}/>
        </div>
        <div id="main-content-container"></div>
      </div>
    );
  }
}

export default PortraitLayout;
