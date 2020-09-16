import React, { Component } from 'react'
import Logo from "../images/heartWalkLogo.png"
import Icon from "../images/comEdLogo.png"
import Break from "../images/linebreak.png";
import Text from "../images/text.png";

class GalleryInfo extends Component {
  render() {
    return (
      <div className="gallery-info gallery-info-title">
        <img src={Logo} alt="Heart Logo"/>
        <img src={Break} alt="Line Break"/>
        <img src={Text} alt="Text"/>
        <img src={Break} alt="Line Break"/>
        <img src={Icon} alt="ComEd Logo"/>
      </div>
    )
  }
}

export default GalleryInfo
