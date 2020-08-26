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
import Timestamp from '../Messages/Timestamp.js';


// =============================================================================
// <PostContent/>
// =============================================================================

class PostContent extends React.Component {
  renderTitle = () => {
    return(
      <div class="header">
        <h2>{this.props.title}</h2>
        <Timestamp time={new Date(1598310192966)} sender={'friend'} />
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
        <Link src={this.props.link}/>
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


// =============================================================================
// <Link/>
// =============================================================================

class Link extends React.Component {

  excludeSubdomain = (basename) => {
    /**
     * Removes the subdomain from a basename url.
     * @param {string} basename A basename url like 'img.youtube.com'
     * @example
     * // returns 'youtube.com'
     * excludeSubdomain('img.youtube.com');
     */
    let l = basename.split('.');
    if (l.length === 2) return basename;

    let [_, domain, extension] = l;
    return domain + '.' + extension;
  }

  getBasename = (link) => {
    /**
     * Simplifies a link down to it's basename.
     * @param {string} link A domain name like 'http{s}://{www.}something.com'
     * @example
     * // returns 'youtube.com'
     * getBasename('http://img.youtube.com/vi/1234567/hqdefault.jpg')
     */
    let splitLink = link.split('/');
    let basename = '';
    if (splitLink[0].includes('http')) {
      // splitLink[1] will be empty because we split 'http://' by '/'
      basename = splitLink[2];
    } else {
      basename = splitLink[0];
    }

    return this.excludeSubdomain(basename);
  }

  render() {
    let basename = this.getBasename(this.props.src);
    return (
      <>
        <img class="favicon" src={'https://' + basename + '/favicon.ico'} />
        <div class="link">{basename}</div>
      </>
    )
  }
}

export default PostContent;
