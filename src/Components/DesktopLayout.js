// =============================================================================
// About: DesktopLayout.js
// =============================================================================
/*
  DesktopLayout contains <DesktopLayout/>, a component that:
    - is used by <App/> to render the desktop version of the site
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './DesktopLayout.css';

// components
import Sidebar from './Navbar/Sidebar.js';


// =============================================================================
// <DesktopLayout/>
// =============================================================================

class DesktopLayout extends React.Component {
  render() {
    return (
      <div id="DesktopLayout">
        <div id={(this.props.renderLandscape) ? 'landscape' : 'portrait'}>
          <div id="sidebar-container">
            <Sidebar selectedPage={this.props.selectedPage} selectPage={this.props.selectPage}/>
          </div>
          <div id="main-content-container"></div>
        </div>
      </div>
    );
  }
}

export default DesktopLayout;
