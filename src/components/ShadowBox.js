import React, { Component } from 'react'

class ShadowBox extends Component {
  render() {
    const photoDatum = this.props.photoData[this.props.shadowboxIndex]
    console.log(photoDatum)
    const extension = photoDatum.url.split('.')[photoDatum.url.split('.').length - 1]
    let media = ''
    if (extension === 'mp4') {
      media = <video src={photoDatum.url} autoPlay loop alt="" />
    } else {
      media = <img src={photoDatum.url} alt="" />
    }
    return (
      <div className="gallery-shadowBox">
        <div className="gallery-shadowBox-hittarget" onClick={this.props.closeShadowbox}></div>
        <div className="gallery-shadowBox-content">
          {media}
        </div>
      </div>
    )
  }
}

export default ShadowBox
