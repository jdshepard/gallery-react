import React, { Component } from 'react'

class GalleryInfo extends Component {
  render() {
    return (
      <h1>{this.props.photos.length}</h1>
    )
  }
}

export default GalleryInfo
