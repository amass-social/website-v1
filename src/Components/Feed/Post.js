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
import AdjustableTextArea from '../Inputs/AdjustableTextArea.js';


// =============================================================================
// <Post/>
// =============================================================================

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replyText: ''
    }
  }

  render() {
    return (
      <div class="post">
        <PostContent
          title        = {this.props.title}
          datetimeSent = {this.props.datetimeSent}
          link         = {this.props.link}
          tags         = {this.props.tags}
          reactions    = {this.props.reactions}
          messages     = {this.props.messages}
        />
        <MessageList />
        <div class="reply-bar">
          <AdjustableTextArea
            ref        = {''}
            text       = {this.state.replyText}
            updateText = {(newText) => {this.setState({replyText: newText})}}
            submitText = {''}
          />
        </div>
      </div>
    );
  }
}

export default Post;
