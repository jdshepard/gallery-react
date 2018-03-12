import React, { Component } from 'react'

class GalleryTile extends Component {
  render() {
    const heightToWidth = this.props.photoDatum.height / this.props.photoDatum.width
    return (
      <div className="gallery-galleryTile" onClick={this.props.openShadowbox}>
        <div className="gallery-galleryTile-image" style={{paddingBottom: `${heightToWidth*100}%`, backgroundImage: `url(${this.props.photoDatum.thumbUrl})`}}>
        </div>
      </div>
    )
  }
}

export default GalleryTile
