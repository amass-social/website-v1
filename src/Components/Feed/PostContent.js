// =============================================================================
// About: PostContent.js
// =============================================================================
/**
  1) PostContent contains <PostContent/>, a component that:
    - contains the main content of a post. Main content refers to,
        * title
        * timestamp
        * the actual content being shared
        * link to content being shared
        * tags
        * reactions

    <PostContent/>'s Props:
      @param {string} title
      @param {string} datetimeSent
      @param {string} link
      @param {array(string)} tags

    <PostContent/>'s Children:
      - n/a

    <PostContent/>'s Parents:
      - <Post/>
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './PostContent.css';


// =============================================================================
// <PostContent/>
// =============================================================================

class PostContent extends React.Component {
  renderTitle = () => {
    return(
      <div class="header">
        <h2>{this.props.title}</h2>
        <p>sent at {this.props.datetimeSent}</p>
      </div>
    )
  }

  renderContent = () => {
    return (
      <div class="preview">
        <img src={this.props.link} />
      </div>
    )
  }

  renderLink = () => {
    return (
      <>
        <img class="favicon" src="http://youtube.com/favicon.ico" />
        <div class="link">{this.props.link}</div>
      </>
    )
  }

  renderTags = () => {
    return (
      <div class="tags">
        <a href="#" class="tag">@person</a>
        <a href="#" class="tag">#tag</a>
      </div>
    )
  }

  renderReactions = () => {
    return (
      <div class="reactions">
        <div class="reaction">😀</div>
        <div class="reaction">🤙</div>
        <div class="reaction">🌊</div>
      </div>
    )
  }

  renderInteractionBar = () => {
    return (
      <div class="interaction-bar">
        {this.renderLink()}
        {this.renderTags()}
        {this.renderReactions()}
      </div>
    )
  }

  render() {
    return (
      <div class="main-content">
        {this.renderTitle()}
        {this.renderContent()}
        {this.renderInteractionBar()}
      </div>
    );
  }
}

export default PostContent;
