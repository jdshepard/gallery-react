import React, { Component } from 'react'

class GalleryInfo extends Component {
  render() {
    return (
      <div>
        <p>Dave's Wedding</p>
        <p>{this.props.photoData.length} photos</p>
      </div>
    )
  }
}

export default GalleryInfo
