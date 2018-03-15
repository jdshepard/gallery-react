import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ShadowBox extends Component {
  render() {
    const photoDatum = this.props.photoDatum
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
        <Link to="/"><div className="gallery-shadowBox-hittarget"></div></Link>
        <div className="gallery-shadowBox-content">
          {media}
        </div>
      </div>
    )
  }
}

export default ShadowBox
