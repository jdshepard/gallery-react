import React, { Component } from 'react'
import GalleryTile from './GalleryTile'
import imagesLoaded from 'imagesloaded'
import LoadedPhotoShower from '../lib/LoadedPhotoShower'
import Infinite from 'react-infinite'

class GalleryTiles extends Component {

  componentDidMount() {
    this.loadedPhotoShower = new LoadedPhotoShower('.gallery-images', '.gallery-galleryTile')
  }

  render() {
    var galleryTiles = this.props.photoData.map((datum, i) => {return (<GalleryTile tileIndex={i} photoDatum={datum}  galleryId={this.props.galleryId} openShadowbox={() => {this.props.setShadowboxIndex(i)}} key={datum.id} />)})
    return (
      <div className="gallery-images">
        <div className="gallery-columnSizer"></div>
        {galleryTiles}
      </div>
    )
  }
}

export default GalleryTiles
