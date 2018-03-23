import React, { Component } from 'react'
import GalleryInfo from './GalleryInfo'
import GalleryTimeControl from './GalleryTimeControl'
import smileboothLogo from '../images/smilebooth_logo_2014_white.png'
import { Link } from 'react-router-dom'

class GalleryControls extends Component {
  render() {
    return (
      <div className="gallery-controls">
        <div className="gallery-controls-content">
          <header>
            <div className="gallery-controls-logo">
              <Link to="/smilebooth-gallery-react">
                <img src={smileboothLogo} alt="Smilebooth Logo" />
              </Link>
            </div>
          </header>
          <nav>
            <GalleryInfo photoData={this.props.photoData} />
            <GalleryTimeControl photoData={this.props.photoData} />
          </nav>
        </div>
      </div>
    )
  }
}

export default GalleryControls
