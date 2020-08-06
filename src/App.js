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
import PortraitNavbar from './Components/Navbar/PortraitNavbar.js';


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
    if (this.state.window.width > this.state.window.height) {
      return (
        <div id="App">
          <div id="landscape">
            <h1>amass!</h1>
            <p>Component: App</p>
            <p>landscape</p>
          </div>
        </div>
      );
    } else if (this.state.window.width > 1000) {
      return (
        <div id="App">
          <div id="portrait">
            <PortraitNavbar
              selectedPage={this.state.selectedPage}
              selectPage={(newPage) => this.setState({'selectedPage': newPage})}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div id="App">
          <div id="mobile">
            <h1>amass!</h1>
            <p>Component: App</p>
            <p>mobile</p>
          </div>
        </div>
      );
    }
  }
}

export default App;
