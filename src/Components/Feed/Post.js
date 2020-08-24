// =============================================================================
// About: Post.js
// =============================================================================
/*
  1) Post contains <Post/>, a component that:
    - contains content that users will see in their <Feed/>

    <Post/>'s Props:
      - n/a

    <Post/>'s Children:
      - n/a

    <Post/>'s Parents:
      - <Feed/>
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './Post.css';


// =============================================================================
// <Post/>
// =============================================================================

class Post extends React.Component {
  render() {
    return (
      <div id="Post">
        <p>Component: Post</p>
      </div>
    );
  }
}

export default Post;
