// =============================================================================
// About: App.js
// =============================================================================
/*
  App.js contains <App/>, which is the root component of this website
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

  // Render --------------------------------------------------------------------

  // Renders <App/> in landscape, portrait, and mobile formats
  render() {

    if (this.state.window.width < 900) {
      return (
        <div id="App">
          <div id="mobile">
            <MobileLayout
              selectedPage = {this.state.selectedPage}
              selectPage   = {(newPage) => this.setState({'selectedPage': newPage})}
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
          selectPage      = {(newPage) => this.setState({'selectedPage': newPage})}
          />
      </div>
    );
  }
}

export default App;
