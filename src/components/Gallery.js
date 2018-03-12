import React, { Component } from 'react'
import GalleryControls from './GalleryControls'
import GalleryTiles from './GalleryTiles'
import ShadowBox from './ShadowBox'
import superagent from 'superagent'

class Gallery extends Component {
  constructor(props) {
    super(props)
    let photoData = []
    this.getPhotos()
    let photos = []
    this.state = {photos, photoData, shadowboxIndex: -1}
  }

  setShadowboxIndex(shadowboxIndex) {
    this.setState({shadowboxIndex})
  }

  componentDidMount() {
    // setTimeout(() => {this.someCallThatAddsPhotos()}, 15000)
  }

  getPhotos() {
    superagent
      .get('http://localhost:4000/photos')
      .end((err, res) => {
        this.setState((prevState, props) => {
          return {photoData: res.body}
        })
        console.log(res.body)
      })
  }

  someCallThatAddsPhotos() {
    this.setState((prevState, props) => {
      return {photos: prevState.photos.concat(this.makePhotosArray(25))}
    })
  }

  makePhotosArray(numberToMake) {
    let photos = []
    for(let i = 0; i < numberToMake; i++) {
      const cachebust = Math.random().toString(36).substr(2, 5)
      photos.push({
        url: `https://thecatapi.com/api/images/get?cachebust=${cachebust}`,
        timestamp: new Date(Date.now() + ~~(Math.random() * 2000000))
      })
    }
    return photos
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
