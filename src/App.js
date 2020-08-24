// =============================================================================
// About: App.js
// =============================================================================
/*
  1) App.js contains <App/>, which:
    - serves as the root

    <App/>'s Props:
      - n/a because <App/> is the root.

    <App/>'s Children:
      - <DesktopLayout/>
      - <MobileLayout/>

    <App/>'s Parents:
      - n/a
*/


// Imports ---------------------------------------------------------------------

import React from 'react';
import './App.css';
import './colors.css';

// Components
import DesktopLayout from './Components/DesktopLayout.js';
import MobileLayout  from './Components/MobileLayout.js';


// =============================================================================
// <App/>
// =============================================================================

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedPage: 'home',
      selectedChatId: '',
      window: { width: 0, height: 0}
    };

  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({'window': {width: window.innerWidth, height: window.innerHeight}});
  }


  // onInput Interactions ------------------------------------------------------

  // This function accomplishes two things:
  //  1) it selects a chat for the user to focus on, as given by the chatId
  //  2) it changes selectedPage to be 'chats'
  selectChat = (chatId) => {
    this.setState({'selectedPage': 'chats', 'selectedChatId': chatId});
  }

  // this function accomplishes 2 things:
  //  1) it updates the selected page
  //  2) it deselects any state values for a specific page (ie: chat info)
  selectPage = (page) => {
    this.setState({'selectedPage': page, 'selectedChatId': ''});
  }

  // Render --------------------------------------------------------------------

  // Renders <App/> in landscape, portrait, and mobile formats
  render() {

    if (this.state.window.width < 900) {
      return (
        <div id="App">
          <div id="mobile">
            <MobileLayout
              selectedPage = {this.state.selectedPage}
              selectPage   = {this.selectPage}
              />
          </div>
        </div>
      );
    }


    return (
      <div id="App">
        <DesktopLayout
          renderLandscape = {(this.state.window.width > this.state.window.height)}
          selectedPage    = {this.state.selectedPage}
          selectPage      = {this.selectPage}
          selectedChatId  = {this.state.selectedChatId}
          selectChat      = {this.selectChat}
          />
      </div>
    );
  }
}

export default App;
