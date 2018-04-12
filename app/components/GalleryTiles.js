import React, { Component } from 'react'
import GalleryTile from './GalleryTile'
import Masonry from 'masonry-layout'
import imagesLoaded from 'imagesloaded'
import LoadedPhotoShower from '../lib/LoadedPhotoShower'
import Infinite from 'react-infinite'

class GalleryTiles extends Component {

  componentDidMount() {
    // this.masonIt()
    this.loadedPhotoShower = new LoadedPhotoShower('.gallery-images', '.gallery-galleryTile')
  }

  componentDidUpdate() {
    // this.masonIt()
  }

  masonIt() {
    var grid = document.querySelector('.gallery-images')
    var masonry = new Masonry(grid, {
      itemSelector: '.gallery-galleryTile',
      columnWidth: '.gallery-columnSizer',
      percentPosition: true
    })
    imagesLoaded(grid).on('progress', (instance, image) => { masonry.layout() })
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
