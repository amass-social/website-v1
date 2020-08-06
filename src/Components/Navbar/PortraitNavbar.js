// =============================================================================
// About: PortraitNavbar.js
// =============================================================================
/*
  PortraitNavbar contains <PortraitNavbar/>, a component that:
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './PortraitNavbar.css';


// =============================================================================
// <PortraitNavbar/>
// =============================================================================

class PortraitNavbar extends React.Component {

  renderTab = (tabName) => {
    if (this.props.selectedPage === tabName) {
        return (
          <div id="selected-container">
            <h2 className="tab-text">{tabName}</h2>
          </div>
        )
    } else {
      return (
        <div className="unselected-container" onClick={() => this.props.selectPage(tabName)}>
          <h2 className="tab-text">{tabName}</h2>
        </div>
      );
    }
  }


  render() {
    return (
      <div id="PortraitNavbar">
        <h1 id="title-text">amass!</h1>
        <div id="tabs-container">
          {this.renderTab("home")}
          {this.renderTab("library")}
          {this.renderTab("friends")}
          {this.renderTab("account")}
        </div>
      </div>
    );
  }
}

export default PortraitNavbar;
