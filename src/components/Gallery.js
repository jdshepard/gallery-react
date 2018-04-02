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
    this.state = {photoData, shadowboxIndex: -1}
    this.galleryURL = 'https://v4-api.smilebooth.com/api/v4/images/list-by-gallery-noauth'
  }

  setShadowboxIndex(shadowboxIndex) {
    this.setState({shadowboxIndex})
  }

  componentDidMount() {
    this.getPhotos()
    setTimeout(this.addNewPhotos.bind(this), 1000)
  }

  addNewPhotos() {
    // const since = this.state.photoData[0].sequenceId
    superagent.post(this.galleryURL)
      .send({galleryId: this.props.galleryId, since: 22446})
      .end((err, res) => {
        console.log(res.body)
        // this.setState((prevState, props) => {
        //   return {photoData: res.body}
        // })
      })
  }

  getPhotos() {
    superagent.post(this.galleryURL)
      .send({galleryId: this.props.galleryId})
      .end((err, res) => {
        console.log(res.body)
        this.setState((prevState, props) => {
          return {photoData: res.body}
        })
      })
  }

  render() {
    return (
      <div className="gallery">
        <Route path="/smilebooth-gallery-react/gallery/:galleryId/photos/:id" render={ ({ match }) => { return <ShadowBox galleryId={this.props.galleryId} shadowboxIndex={parseInt(match.params.id, 10)} photoData={this.state.photoData} /> }} />
        <GalleryControls photoData={this.state.photoData} />
        <GalleryTiles galleryId={this.props.galleryId} photoData={this.state.photoData} setShadowboxIndex={this.setShadowboxIndex.bind(this)} />
      </div>
    )
  }
}

export default Gallery
