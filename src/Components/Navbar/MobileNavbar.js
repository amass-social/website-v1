// =============================================================================
// About: MobileNavbar.js
// =============================================================================
/*
  MobileNavbar contains <MobileNavbar/>, a component that:
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './MobileNavbar.css';


// images
import ICON_HOME_UNSELECTED    from '../../Images/icons/feed_icon.png';
import ICON_HOME_SELECTED      from '../../Images/icons/feed_icon_filled.png';
import ICON_LIBRARY_UNSELECTED from '../../Images/icons/library_icon.png';
import ICON_LIBRARY_SELECTED   from '../../Images/icons/library_icon_filled.png';
import ICON_CHAT_UNSELECTED    from '../../Images/icons/chat_icon.png';
import ICON_CHAT_SELECTED      from '../../Images/icons/chat_icon_filled.png';
import ICON_FRIENDS_UNSELECTED from '../../Images/icons/friends_icon.png';
import ICON_FRIENDS_SELECTED   from '../../Images/icons/friends_icon_filled.png';


// =============================================================================
// <MobileNavbar/>
// =============================================================================

class MobileNavbar extends React.Component {

  renderTab = (tabName, selectedImage, unselectedImage) => {
    if (tabName === this.props.selectedPage) {
      return (
        <img className='icon' src={selectedImage} alt={tabName}/>
      );
    } else {
      return (
        <img className='icon' src={unselectedImage} alt={tabName} onClick={() => this.props.selectPage(tabName)}/>
      );
    }
  }



  render() {
    return (
      <div id="MobileNavbar">
        {this.renderTab('home', ICON_HOME_SELECTED, ICON_HOME_UNSELECTED)}
        {this.renderTab('library', ICON_LIBRARY_SELECTED, ICON_LIBRARY_UNSELECTED)}
        <h4 id="new-post-button">+</h4>
        {this.renderTab('chat', ICON_CHAT_SELECTED, ICON_CHAT_UNSELECTED)}
        {this.renderTab('friends', ICON_FRIENDS_SELECTED, ICON_FRIENDS_UNSELECTED)}
      </div>
    );
  }
}

export default MobileNavbar;
