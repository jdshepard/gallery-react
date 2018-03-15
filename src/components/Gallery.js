import React, { Component } from 'react'
import GalleryControls from './GalleryControls'
import GalleryTiles from './GalleryTiles'
import ShadowBox from './ShadowBox'
import { Route } from 'react-router-dom'

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
    return (
      <div className="gallery">
        <Route path="/smilebooth-gallery-react/photos/:id" render={ ({ match }) => { return <ShadowBox photoDatum={this.state.photoData[match.params.id]} /> }} />
        <GalleryControls photoData={this.state.photoData} />
        <GalleryTiles photoData={this.state.photoData} setShadowboxIndex={this.setShadowboxIndex.bind(this)} />
      </div>
    )
  }
}

export default Gallery
