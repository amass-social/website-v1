// =============================================================================
// About: MessageList.js
// =============================================================================
/**
  1) MessageList contains <MessageList/>, a component that:
    - holds a list of messages for a post

    <MessageList/>'s Props:
      @param {object[]} messages An array of messages with properties: sender, 
      text, and timestamp
      @param {boolean} displayProfilePictures

    <MessageList/>'s Children:
      - <Message/>

    <MessageList/>'s Parents:
      - n/a
*/

// Imports ---------------------------------------------------------------------

import React from 'react';
import './MessageList.css';
import Message from './Message.js';
import ProfilePicture from '../User/ProfilePicture';
import Timestamp from './Timestamp';

// Constants -------------------------------------------------------------------

const LOGGED_IN_USER = 'username';

// =============================================================================
// <MessageList/>
// =============================================================================

class MessageList extends React.Component {
  createMessageGroups = (messages) => {
    /**
     * Parses a list of messages and creates message groups from them.
     * Messages are split into groups by the duration between them and 
     * their sender.
     * @param {object[]} messages A list of message objects
     * @example
     * // returns [
     *  [
     *    {sender: 'user', text: 'hi',    timestamp: Date(123456)}, 
     *    {sender: 'user', text: 'hello', timestamp: Date(123456)}
     *  ]
     * ]
     * parseMessages( 
     *  [
     *    {sender:'user', text: 'hi',    timestamp:Date(123456)}, 
     *    {sender:'user', text: 'hello', timestamp:Date(123456)}
     *  ]
     * )
     */
    let messageGroups = [];
    let currGroup = [messages[0]];
    for (let i = 1; i < messages.length; ++i) {
      let prevMessage = messages[i-1];
      let currMessage = messages[i];

      let haveSameSender = (currMessage.sender === prevMessage.sender);
      let areLessThanOneMinuteApart = (
        currMessage.timestamp - prevMessage.timestamp < 60000
      );

      if (haveSameSender && areLessThanOneMinuteApart) {
        currGroup.push(currMessage);
      } else {
        messageGroups.push(currGroup);
        currGroup = [currMessage];
      }
    }

    console.log(messageGroups)
    console.log(messages)
    // Handle end edge case
    if (currGroup.length !== 0) messageGroups.push(currGroup);

    return messageGroups;
  }

  render() {
    return (
      <div class="message-list">
        {this.createMessageGroups(this.props.messages).map(messageGroup => {
          return (
            <MessageGroup 
              messages={messageGroup} 
              displayProfilePictures={this.props.displayProfilePictures}
            />
          )
        })}
      </div>
    );
  }
}

export default MessageList;



// =============================================================================
// <MessageGroup/>
// =============================================================================

class MessageGroup extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.messages)
    this.format = (props.messages[0].sender === LOGGED_IN_USER)
      ? 'sent'
      : 'recieved'
      ;
  }

  renderProfilePicture = () => {
    /**
     * Display profile picture if directed to.
     */
    if (this.props.displayProfilePictures) {
      return <ProfilePicture src='https://i.imgur.com/c1Tn08T.jpg'/>
    }
  }

  renderMessages = () => {
    /**
     * Render messages with using one time stamp for all of them.
     */
    return (
    <div className={'messages ' + this.format}>
      {this.props.messages.map(message => {
        return(
          <Message 
            text={message.text} 
            format={this.format}
          />
        )
      })}
      <Timestamp 
          time={this.props.messages[0].timestamp} 
          sender={this.props.messages[0].sender}
          className={(this.format === 'sent')
            ? 'align-right'
            : 'align-left'
          }
        />
    </div>
    )
  }

  renderSentMessageGroup = () => {
    /**
     * Renders a message group with the profile picture right aligned.
     */
    return (
      <>
        {this.renderMessages()}
        {this.renderProfilePicture()}
      </>
    )
  }

  renderRecievedMessageGroup = () => {
    /**
     * Renders a message group with the profile picture left aligned.
     */
    return (
      <>
        {this.renderProfilePicture()}
        {this.renderMessages()}
      </>
    )
  }

  render() {
    return (
      <div class={"message-group " + this.format}>
        {
          (this.format === 'sent')
            ? this.renderSentMessageGroup()
            : this.renderRecievedMessageGroup()
        }
      </div>
    )
  }
}