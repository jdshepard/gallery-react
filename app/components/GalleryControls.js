import React, { Component } from 'react'
import GalleryInfo from './GalleryInfo'
import GalleryTimeControl from './GalleryTimeControl'
import { Link } from 'react-router-dom'

class GalleryControls extends Component {
  render() {
    return (
      <div className="gallery-controls">
        <div className="gallery-controls-content">
          <nav>
            <GalleryInfo galleryName={this.props.galleryName} photoData={this.props.photoData} />
            {/* <GalleryTimeControl photoData={this.props.photoData} /> */}
          </nav>
        </div>
      </div>
    )
  }
}

export default GalleryControls
