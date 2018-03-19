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
      media = <div className="img" style={{backgroundImage: `url('${photoDatum.url}')`}}></div>
    }
    return (
      <div className="gallery-shadowBox">
        <Link to="/smilebooth-gallery-react"><div className="gallery-shadowBox-hittarget"></div></Link>
        <div className="gallery-toolbox">
          <ul className="gallery-toolbox-actions">
            <li className="gallery-toolbox-action action-exit">
              <div className="toolbox-action-iconHolder">
                <i className="fas fa-times"></i>
              </div>
            </li>
            <li className="gallery-toolbox-action">
              <div className="toolbox-action-iconHolder">
                <i className="fas fa-envelope"></i>
              </div>
            </li>
            <li className="gallery-toolbox-action">
              <div className="toolbox-action-iconHolder">
                <i className="fas fa-comments"></i>
              </div>
            </li>
          </ul>
        </div>
        <div className="gallery-shadowBox-content">
          <div className="gallery-shadowBox-loader loader"></div>
          <div className="gallery-shadowBox-media">
            {media}
          </div>
          <div className="gallery-shadowBox-navigation">
            <div className="shadowBox-navigation shadowBox-navigationPrevious"><i className="fas fa-angle-left"></i></div>
            <div className="shadowBox-navigation shadowBox-navigationNext"><i className="fas fa-angle-right"></i></div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShadowBox
