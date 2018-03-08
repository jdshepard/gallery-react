import React, { Component } from 'react'
import GalleryControls from './GalleryControls'
import GalleryTiles from './GalleryTiles'
import ShadowBox from './ShadowBox'

class Gallery extends Component {
  constructor(props) {
    super(props)
    const photosToLoad = 50
    let photos = this.makePhotosArray(photosToLoad)
    photos = this.sortPhotos(photos)
    this.state = {photos, shadowboxIndex: -1}
  }

  setShadowboxIndex(shadowboxIndex) {
    console.log(shadowboxIndex)
    this.setState({shadowboxIndex})
  }

  componentDidMount() {
    // setTimeout(() => {this.someCallThatAddsPhotos()}, 15000)
  }

  sortPhotos(photos) {
    photos.sort((a, b) => { return b.timestamp - a.timestamp })
    return photos
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
      shadowBox = <ShadowBox photos={this.state.photos} shadowboxIndex={this.state.shadowboxIndex} closeShadowbox={() => this.setShadowboxIndex(-1)} />
    return (
      <div className="gallery">
        {shadowBox}
        <GalleryControls photos={this.state.photos} />
        <GalleryTiles photos={this.state.photos} setShadowboxIndex={this.setShadowboxIndex.bind(this)} />
      </div>
    )
  }
}

export default Gallery
