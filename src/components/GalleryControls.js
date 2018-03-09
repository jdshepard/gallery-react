import React, { Component } from 'react'
import GalleryInfo from './GalleryInfo'
import GalleryTimeControl from './GalleryTimeControl'

class GalleryControls extends Component {
  render() {
    return (
      <div className="gallery-controls">
        <GalleryInfo photoData={this.props.photoData} />
        <GalleryTimeControl photoData={this.props.photoData} />
      </div>
    )
  }
}

export default GalleryControls
