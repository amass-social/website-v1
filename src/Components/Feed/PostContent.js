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
      @param {string} title The title of the post
      @param {Date} datetimeSent The time the post was created
      @param {string} link The link to the shared page
      @param {string[]} tags A list of tags to display
      @param {string[]} reactions A list of emojis users have reacted with

    <PostContent/>'s Children:
      - n/a

    <PostContent/>'s Parents:
      - <Post/>
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './PostContent.css';
import Timestamp from '../Messages/Timestamp.js';
import Reactions from './Reactions.js';


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
        <img src={this.props.link} alt=''/>
      </div>
    )
  }

  renderTags = () => {
    return (
      <div class="tags">
        {this.props.tags.map( tag => {
          return <a href="/" class="tag">{tag}</a>
        })}
      </div>
    )
  }

  renderReactions = () => {
    return (

      <Reactions reactions={this.props.reactions}/>
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
  constructor(props) {
    super(props);
    this.state = {
      basename: this.getBasename(this.props.src),
      faviconSource: this.toFaviconUrl(this.getBasename(this.props.src))
    }
  }

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

    let [domain, extension] = l.slice(1);
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

    return basename;
  }

  handleFaviconError = () => {
    /**
     * If a favicon isn't found at the subdomain url, check the base url.
     * For example, if a favicon isn't found for img.youtube.com fallback to youtube.com.
     */
    let newSource = this.toFaviconUrl(this.excludeSubdomain(this.state.basename))
    this.setState({faviconSource: newSource})
  }

  toFaviconUrl = (basename) => {
    /**
     * Prepends 'https' to the basename so our site knows its and outside link
     * and appends directory where favicon normally lives.
     */
    return 'https://' + basename + '/favicon.ico'
  }

  render() {
    return (
      <>
        <img 
          onError={() =>this.handleFaviconError} 
          class="favicon" 
          src={this.state.faviconSource} 
          alt=''
        />
        <div class="link">{this.state.basename}</div>
      </>
    )
  }
}

export default PostContent;
