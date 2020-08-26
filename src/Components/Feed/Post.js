// =============================================================================
// About: Post.js
// =============================================================================
/**
  1) Post contains <Post/>, a component that:
    - contains content that users will see in their <Feed/>

    <Post/>'s Props:
      @param {string} title
      @param {string} datetimeSent
      @param {string} link
      @param {array(string)} tags
      @param {array(array)} messages

    <Post/>'s Children:
      - <PostContent/>

    <Post/>'s Parents:
      - <Feed/>
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './Post.css';
import PostContent from './PostContent';
import MessageList from '../Messages/MessageList.js';


// =============================================================================
// <Post/>
// =============================================================================

class Post extends React.Component {
  render() {
    return (
      <div class="post">
        <PostContent
          title        = {this.props.title}
          datetimeSent = {this.props.datetimeSent}
          link         = {this.props.link}
          tags         = {this.props.tags}
        />
        <MessageList />
        <div class="reply-bar"></div>
      </div>
    );
  }
}

export default Post;