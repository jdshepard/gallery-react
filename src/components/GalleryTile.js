import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class GalleryTile extends Component {
  render() {
    const heightToWidth = this.props.photoDatum.height / this.props.photoDatum.width
    let tile = null
    const extension = this.props.photoDatum.cardUrl.split('.')[this.props.photoDatum.cardUrl.split('.').length - 1]
    if (extension === 'mp4') {
      tile = <div className="gallery-galleryTile-image" style={{paddingBottom: `${heightToWidth*100}%`, backgroundImage: `url(${this.props.photoDatum.thumbUrl})`}}></div>
    } else {
      tile = <div className="gallery-galleryTile-image" style={{paddingBottom: `${heightToWidth*100}%`, backgroundImage: `url(${this.props.photoDatum.cardUrl})`}}></div>
    }

    return (
      <Link to={`/smilebooth-gallery-react/gallery/${this.props.galleryId}/photos/${this.props.tileIndex}`}>
        <div className="gallery-galleryTile">
          {tile}
        </div>
      </Link>
    )
  }
}

export default GalleryTile
