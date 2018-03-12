import React, { Component } from 'react'
import GalleryControls from './GalleryControls'
import GalleryTiles from './GalleryTiles'
import ShadowBox from './ShadowBox'

class Gallery extends Component {
  constructor(props) {
    super(props)
    let photoData = []
    this.state = {photoData, shadowboxIndex: -1}
  }

  setShadowboxIndex(shadowboxIndex) {
    this.setState({shadowboxIndex})
  }

  componentDidMount() {
    this.getPhotos()
  }

  getPhotos() {
    const photoData = require('../data/smilebooth_mock_server.json').photos
    this.setState({photoData})
  }

  render() {
    let shadowBox = null
    if (this.state.shadowboxIndex >= 0)
      shadowBox = <ShadowBox photoData={this.state.photoData} shadowboxIndex={this.state.shadowboxIndex} closeShadowbox={() => this.setShadowboxIndex(-1)} />
    return (
      <div className="gallery">
        {shadowBox}
        <GalleryControls photoData={this.state.photoData} />
        <GalleryTiles photoData={this.state.photoData} setShadowboxIndex={this.setShadowboxIndex.bind(this)} />
      </div>
    )
  }
}

export default Gallery
