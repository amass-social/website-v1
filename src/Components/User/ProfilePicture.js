// =============================================================================
// About: ProfilePicture.js
// =============================================================================
/**
  1) ProfilePicture contains <ProfilePicture/>, a component that:
    - displays a user's profile picture in a circle

    <ProfilePicture/>'s Props:
      @param {string} src A link to the image to use
      @param {string} size The desired size of the profile picture in pixels

    <ProfilePicture/>'s Children:
      - n/a

    <ProfilePicture/>'s Parents:
      - n/a
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './ProfilePicture.css';


// =============================================================================
// <ProfilePicture/>
// =============================================================================

class ProfilePicture extends React.Component {
  
  // if a size is specified in props use it otherwise default to 48px
  size = this.props.size
    ? this.props.size
    : '48px'
    ;

  // Set the width and height equal to each other
  styling = {
    width:  this.size,
    height: this.size
  }

  render() {
    return (
      <div 
        class="profile-picture"
        style={this.styling}
      >
        <img src={this.props.src} alt=''/>
      </div>
    );
  }
}

export default ProfilePicture;
