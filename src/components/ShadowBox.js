import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ShadowboxShare from './ShadowboxShare'
import CloseIcon from '../images/close-icon.svg'

class ShadowBox extends Component {

  constructor(props) {
    super(props)
    this.state = {
      shareType: null
    }
  }

  share(shareType) {
    this.setState({shareType})
  }

  render() {
    const photoDatum = this.props.photoData[this.props.shadowboxIndex]
    let media = null
    if (photoDatum) {
      const extension = photoDatum.url.split('.')[photoDatum.url.split('.').length - 1]
      if (extension === 'mp4') {
        media = <video src={photoDatum.url} autoPlay loop alt="" />
      } else {
        media = <div className="img" style={{backgroundImage: `url('${photoDatum.url}')`}}></div>
      }
    } else {
      media = <i>loading</i>
    }

    let previousLink = null
    let nextLink = null

    if (this.props.shadowboxIndex > 0)
      previousLink = <Link to={`/smilebooth-gallery-react/gallery/${this.props.galleryId}/photos/${this.props.shadowboxIndex - 1}`}><div className="shadowBox-navigation shadowBox-navigationPrevious"><i className="angle-left"></i></div></Link>

    if (this.props.shadowboxIndex < this.props.photoData.length - 1)
      nextLink = <Link to={`/smilebooth-gallery-react/gallery/${this.props.galleryId}/photos/${this.props.shadowboxIndex + 1}`}><div className="shadowBox-navigation shadowBox-navigationNext"><i className="angle-right"></i></div></Link>

    let shadowboxShare = null
    if (this.state.shareType === 'email')
      shadowboxShare = <ShadowboxShare photoDatum={photoDatum} shareType={this.state.shareType} closeShare={() => { this.share(null) }} />
    else if (this.state.shareType === 'mms')
      shadowboxShare = <ShadowboxShare photoDatum={photoDatum} shareType={this.state.shareType} closeShare={() => { this.share(null) }} />
    return (
      <div className="gallery-shadowBox">
        <div className="shadowBox-close"><Link to={`/smilebooth-gallery-react/gallery/${this.props.galleryId}`}></Link><object type="image/svg+xml" data={CloseIcon}>close shadowbox</object></div>
        <div className="gallery-toolbox">
          <ul className="gallery-toolbox-actions">
            <li className="gallery-toolbox-action" onClick={() => { this.share('email') }}>
              <div className="toolbox-action-iconHolder">
                <i className="far fa-envelope"></i>
              </div>
            </li>
            <li className="gallery-toolbox-action" onClick={() => { this.share('mms') }}>
              <div className="toolbox-action-iconHolder">
                <i className="far fa-comment"></i>
              </div>
            </li>
          </ul>
        </div>
        <div className="gallery-shadowBox-content">
          <div className="gallery-shadowBox-loader loader"></div>
          <div className="gallery-shadowBox-media">
            {media}
          </div>
          {shadowboxShare}
          <div className="gallery-shadowBox-navigation">
            {previousLink}
            {nextLink}
          </div>
        </div>
      </div>
    )
  }
}

export default ShadowBox
