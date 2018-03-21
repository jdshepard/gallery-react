import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class GalleryTile extends Component {
  render() {
    const heightToWidth = this.props.photoDatum.height / this.props.photoDatum.width
    return (
      <Link to={`/smilebooth-gallery-react/gallery/${this.props.galleryId}/photos/${this.props.tileIndex}`}>
        <div className="gallery-galleryTile">
          <div className="gallery-galleryTile-image" style={{paddingBottom: `${heightToWidth*100}%`, backgroundImage: `url(${this.props.photoDatum.cardUrl})`}}>
          </div>
        </div>
      </Link>
    )
  }
}

export default GalleryTile
