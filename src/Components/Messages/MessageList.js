// =============================================================================
// About: MessageList.js
// =============================================================================
/*
  1) MessageList contains <MessageList/>, a component that:
    - ...

    <MessageList/>'s Props:
      - n/a

    <MessageList/>'s Children:
      - n/a

    <MessageList/>'s Parents:
      - n/a
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './MessageList.css';
import Message from './Message.js';


// =============================================================================
// <MessageList/>
// =============================================================================

class MessageList extends React.Component {
  render() {
    return (
      <div id="message-list">
        <p>Component: MessageList</p>
        <Message />
      </div>
    );
  }
}

export default MessageList;
