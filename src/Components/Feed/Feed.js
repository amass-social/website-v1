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

/**
 * Data for link prop
 */
const YT_LINKS = [
  'https://live.staticflickr.com/65535/50272292716_f0d9f0e728_h.jpg',
  'https://img.youtube.com/vi/F2yI7fNd9fQ/hqdefault.jpg',
  'https://img.youtube.com/vi/uLCXn445-eQ/hqdefault.jpg',
  'https://img.youtube.com/vi/F2yI7fNd9fQ/hqdefault.jpg',
];

/**
 * Data for messages prop
 */
const LOREM = "lorem ipsum dolor sit amet consectetur adipiscing elit Proin" +
              "metus elit, dapibus a odio et elementum suscipit sem";
const USERS = ['username', 'friend'];

let generatePlaceholderMessage = (length) => {
  /**
   * Generates a message to use for testing Message appearance.
   */
  let dictionary = LOREM.split(' ');
  let numberOfWords = Math.floor(Math.random() * length) + 1

  let message = ''
  for (let i = 0; i < numberOfWords; ++i) {
    let randomWord = Math.floor(Math.random() * dictionary.length);
    message += dictionary[randomWord] + ' ';
  }

  return message;
}

let generateMessages = () => {
  /**
   * Generates a list of <Message/>s for testing.
   */
  let numberOfMessages = Math.floor(Math.random() * 5) + 1;
  let user = USERS[1];  // first message always sent by friend

  let messages = [];
  for (let i = 0; i < numberOfMessages; ++i) {
    messages.push(
      {
        sender: user,
        text: generatePlaceholderMessage(Math.random()*30),
        timestamp: Date.now() - Math.random() * 3600000
      }
    )
    user = USERS[Math.floor(Math.random() * 2)];
  }

  return messages;
}

/**
 * Create posts
 */
let POSTS = []
for (let i = 0; i < YT_LINKS.length; ++i) {
  POSTS.push(
    <Post
      title         = {generatePlaceholderMessage(Math.random()*10)}
      datetimeSent  = {Date.now()}
      link          = {YT_LINKS[i]}
      tags          = {['@user', '#tag', '$group']}
      reactions     = {['😀', '🤙', '🌊']}
      messages      = {generateMessages()}
    />
  )
}

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
