import React, { Component } from 'react'
import GalleryControls from './GalleryControls'
import GalleryTiles from './GalleryTiles'
import ShadowBox from './ShadowBox'
import { Route } from 'react-router-dom'
import superagent from 'superagent'

class Gallery extends Component {
  constructor(props) {
    super(props)
    let photoData = []
    this.state = {photoData, shadowboxIndex: -1, galleryName: ''}
    this.galleryURL = 'https://v4-api.smilebooth.com/api/v4/images/list-by-gallery-noauth'
  }

  setShadowboxIndex(shadowboxIndex) {
    this.setState({shadowboxIndex})
  }

  componentDidMount() {
    this.getPhotos()
    this.getGallery()
  }

  getPhotos() {
    superagent.post(this.galleryURL)
      .send({galleryId: this.props.galleryId})
      .end((err, res) => {
        this.setState((prevState, props) => {
          const photos = res.body.sort((a, b) => { return b.sequenceId - a.sequenceId })
          return {photoData: photos}
        })
      })
  }

  getGallery() {
    const gallerListUrl = 'https://v4-api.smilebooth.com/api/v4/folders/list-names-noauth'
    superagent.post(gallerListUrl).end((err, res) => {
      this.setState((prevState, props) => {
        const galleryEntry = res.body.find((gallery) => { return gallery.id == this.props.galleryId })
        return {galleryName: galleryEntry.name}
      })
    })
  }

  render() {
    return (
      <div className="gallery">
        <Route path="/gallery/:galleryId/photos/:photoId" render={ ({ match }) => { return <ShadowBox galleryId={this.props.galleryId} photoData={this.state.photoData} /> }} />
        <GalleryControls galleryName={this.state.galleryName} photoData={this.state.photoData} />
        <GalleryTiles galleryId={this.props.galleryId} photoData={this.state.photoData} setShadowboxIndex={this.setShadowboxIndex.bind(this)} />
      </div>
    )
  }
}

export default Gallery
