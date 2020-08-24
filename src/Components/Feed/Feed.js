// =============================================================================
// About: Feed.js
// =============================================================================
/*
  1) Feed contains <Feed/>, a component that:
    - contains content in the form of <Post/>s for users to view on their
      homepage

    <Feed/>'s Props:
      - n/a

    <Feed/>'s Children:
      - <Post/>

    <Feed/>'s Parents:
      - n/a
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './Feed.css';
import Post from './Post.js'


// =============================================================================
// <Feed/>
// =============================================================================

class Feed extends React.Component {
  render() {
    return (
      <div id="Feed">
        <p>Component: Feed</p>
        <Post />
      </div>
    );
  }
}

export default Feed;
