import React, { Component } from 'react'

class ShadowBox extends Component {
  render() {
    return (
      <div className="gallery-shadowBox">
        <div className="gallery-shadowBox-hittarget" onClick={this.props.closeShadowbox}></div>
        <div className="gallery-shadowBox-content">
          <img src={this.props.photos[this.props.shadowboxIndex].url} />
        </div>
      </div>
    )
  }
}

export default ShadowBox
