// =============================================================================
// About: PreventOutsideScrollingContainer.js
// =============================================================================
/**
  1) PreventOutsideScrollingContainer contains <PreventOutsideScrollingContainer/>, a component that:
    - Stops other components from scrolling when the top or bottom of the container is reached

    <PreventOutsideScrollingContainer/>'s Props:
      @param {string}     id            (optional) The id of the container
      @param {string}     className     (optional) The className of the container
      @param {React.Ref}  containerRef  (optional) Pointer to assign div reference to

*/

// Imports ---------------------------------------------------------------------

import React from 'react';


// =============================================================================
// <PreventOutsideScrollingContainer/>
// =============================================================================

class PreventOutsideScrollingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.containerReference = this.props.containerRef || React.createRef();
  }

  componentDidMount = () => {
    /**
     * Initialize scrollTop so that when the container is first loaded it
     * will detect a scroll event. If the scrollTop was set to 0 and the
     * container was scolled up, it would not detect a scroll event but still
     * scroll background containers.
     */
    this.setScrollPosition(1);
    this.containerReference.current.addEventListener('scroll',
      this.preventOutsideScrolling,
      false
    );
  }

  componentWillUnmount = () => {
    this.containerReference.current.removeEventListener('scroll', 
      this.preventOutsideScrolling, 
      false
    );
  }

  // Scrolling -----------------------------------------------------------------

  preventOutsideScrolling = () => {
    /**
     * Prevents scrolling of containers outside the EmojiSelect window.
     * Once the window is scrolled to the bottom or top set the scrollTop back
     * to the inside of the container, preventing it ever actually reaching the
     * top or bottom of the container.
     */
    let scrollTop = this.containerReference.current.scrollTop;
    let scrollHeight = this.containerReference.current.scrollHeight;
    let offsetHeight = this.containerReference.current.offsetHeight;
    let contentHeight = scrollHeight - offsetHeight;

    if (contentHeight <= scrollTop) {  // Box is scrolled to the bottom
      this.setScrollPosition(contentHeight - 1);
    } else if (scrollTop === 0) {  // Box is scrolled to the top
      this.setScrollPosition(1);
    }

  }

  setScrollPosition = (position) => {
    this.containerReference.current.scrollTop = position;
  }

  render() {
    return (
      <div 
        id        = {this.props.id || ''} 
        className = {this.props.className || ''}
        ref       = {this.containerReference || ''}
      >
        {this.props.children}
      </div>
    );
  }
}

export default PreventOutsideScrollingContainer;
