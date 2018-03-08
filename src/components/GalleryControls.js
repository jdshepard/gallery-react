import React, { Component } from 'react'
import GalleryInfo from './GalleryInfo'
import GalleryTimeControl from './GalleryTimeControl'

class GalleryControls extends Component {
  render() {
    return (
      <div className="gallery-controls">
        <GalleryInfo photos={this.props.photos} />
        <GalleryTimeControl photos={this.props.photos} />
      </div>
    )
  }
}

export default GalleryControls
