import React, { Component } from 'react'
import GalleryTile from './GalleryTile'
import Masonry from 'masonry-layout'
import imagesLoaded from 'imagesloaded'

class GalleryTiles extends Component {
  componentDidMount() {
    this.masonIt()
  }

  componentDidUpdate() {
    this.masonIt()
  }

  masonIt() {
    var grid = document.querySelector('.gallery-images')
    var masonry = new Masonry(grid, {
      itemSelector: '.gallery-galleryTile',
      columnWidth: '.gallery-columnSizer',
      percentPosition: true
    })
    imagesLoaded(grid).on('progress', () => {
      masonry.layout()
    })
  }

  render () {
    var galleryTiles = this.props.photos.map((photo, i) => {return (<GalleryTile src={photo.url} setShadowboxIndex={() => {this.props.setShadowboxIndex(i)}} key={photo.url} />)})
    return (
      <div className="gallery-images">
        <div className="gallery-columnSizer"></div>
        {galleryTiles}
      </div>
    )
  }
}

export default GalleryTiles
