import React, { Component } from 'react'
import GalleryInfo from './GalleryInfo'
import GalleryTimeControl from './GalleryTimeControl'
import smileboothLogo from '../images/smilebooth_logo_2014_white.png'

class GalleryControls extends Component {
  render() {
    return (
      <div className="gallery-controls">
        <header>
          <div className="gallery-controls-logo">
            <img src={smileboothLogo} alt="Smilebooth Logo" />
          </div>
        </header>
        <GalleryInfo photoData={this.props.photoData} />
        <GalleryTimeControl photoData={this.props.photoData} />
      </div>
    )
  }
}

export default GalleryControls
