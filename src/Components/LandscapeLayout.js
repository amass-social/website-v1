// =============================================================================
// About: LandscapeLayout.js
// =============================================================================
/*
  LandscapeLayout contains <LandscapeLayout/>, a component that:
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './LandscapeLayout.css';

import Sidebar from './Navbar/Sidebar.js';


// =============================================================================
// <LandscapeLayout/>
// =============================================================================

class LandscapeLayout extends React.Component {

  // render --------------------------------------------------------------------

  render() {
    return (
      <div id="LandscapeLayout">
        <div id="sidebar-container">
          <Sidebar selectedPage={this.props.selectedPage} selectPage={this.props.selectPage}/>
        </div>
        <div id="main-content-container"></div>
      </div>
    );
  }
}

export default LandscapeLayout;
