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

// Constants -------------------------------------------------------------------

const YT_LINKS = [
  'https://img.youtube.com/vi/BV2FdDmGiW0/hqdefault.jpg',
  'https://img.youtube.com/vi/F2yI7fNd9fQ/hqdefault.jpg',
  'https://img.youtube.com/vi/uLCXn445-eQ/hqdefault.jpg',
  'https://img.youtube.com/vi/F2yI7fNd9fQ/hqdefault.jpg',
];

let POSTS = []
for (let i = 0; i < YT_LINKS.length; ++i) {
  POSTS.push(
    <Post
      title         = {'Video'}
      datetimeSent  = {Date.now()}
      link          = {YT_LINKS[i]}
      tags          = {['@user', '#tag', '$group']}
      reactions     = {['😀', '🤙', '🌊']}
      messages      = {['a']}
    />
  )
}

console.log(POSTS);

// =============================================================================
// <Feed/>
// =============================================================================

class Feed extends React.Component {
  render() {
    return (
      <div id="Feed">
        {
          POSTS.map(post => {
            return post;
          })
        }
      </div>
    );
  }
}

export default Feed;
