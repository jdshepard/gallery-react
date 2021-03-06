import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import ShadowboxShare from './ShadowboxShare'
import CloseIcon from '../images/close-icon.svg'
import Mousetrap from 'mousetrap'
import $ from 'jquery'
import Swipeable from 'react-swipeable'
import { FacebookButton, TwitterButton } from 'react-social'

class ShadowBox extends Component {

  constructor(props) {
    super(props)
    this.state = {
      shareType: null
    }
  }

  componentDidMount() {
    Mousetrap.bind(['right', 'k'], this.goNext.bind(this))
    Mousetrap.bind(['left', 'j'], this.goPrevious.bind(this))
    Mousetrap.bind('escape', this.exit.bind(this))
  }

  componentWillUnmount() {
    Mousetrap.unbind(['right', 'k'])
    Mousetrap.unbind(['left', 'j'])
    Mousetrap.unbind('escape')
  }

  photoIndex() {
    const photoId = parseInt(this.props.match.params.photoId, 10)
    const shadowboxIndex = this.props.photoData.findIndex((photo) => { return photoId === parseInt(photo.id, 10) })
    return shadowboxIndex
  }

  share(shareType) {
    this.setState({shareType})
  }

  nextLink() {
    return `${this.galleryLink()}/photos/${this.props.photoData[this.photoIndex() + 1].id}`
  }

  previousLink() {
    return `${this.galleryLink()}/photos/${this.props.photoData[this.photoIndex() - 1].id}`
  }

  galleryLink() {
    return `/${this.props.match.params.galleryId}`
  }

  goNext() {
    if (this.photoIndex() < this.props.photoData.length - 1)
      this.props.history.push(this.nextLink())
  }

  goPrevious() {
    if (this.photoIndex() > 0)
      this.props.history.push(this.previousLink())
  }

  exit() {
    this.props.history.push(this.galleryLink())
  }

  render() {
    const photoDatum = this.props.photoData[this.photoIndex()]
    let media = null
    if (photoDatum) {
      const extension = photoDatum.url.split('.')[photoDatum.url.split('.').length - 1]
      if (extension === 'mp4') {
        media = <video src={photoDatum.url} autoPlay playsInline loop alt="" />
      } else {
        media = <div className="img" style={{backgroundImage: `url('${photoDatum.url}')`}}></div>
      }
    } else {
      media = <i>loading</i>
    }

    let previousLink = null
    let nextLink = null

    if (this.photoIndex() > 0)
      previousLink = <Link to={this.previousLink()}><div className="shadowBox-navigation shadowBox-navigationPrevious"><i className="angle-left"></i></div></Link>

    if (this.photoIndex() < this.props.photoData.length - 1)
      nextLink = <Link to={this.nextLink()}><div className="shadowBox-navigation shadowBox-navigationNext"><i className="angle-right"></i></div></Link>

    let shadowboxShare = null
    if (this.state.shareType === 'email')
      shadowboxShare = <ShadowboxShare photoDatum={photoDatum} shareType={this.state.shareType} closeShare={() => { this.share(null) }} />
    else if (this.state.shareType === 'mms')
      shadowboxShare = <ShadowboxShare photoDatum={photoDatum} shareType={this.state.shareType} closeShare={() => { this.share(null) }} />

    let url = ''
    if (global.window)
      url = global.window.location

    const emailShareLink = (
      <li className="gallery-toolbox-action" key="email-share" onClick={() => { this.share('email') }}>
        <div className="toolbox-action-iconHolder">
          <button>
            <i className="far fa-envelope"></i>
          </button>
        </div>
      </li>
    )

    const mmsShareLink = (
      <li className="gallery-toolbox-action" key="mms-share" onClick={() => { this.share('mms') }}>
        <div className="toolbox-action-iconHolder">
          <i className="far fa-comment"></i>
        </div>
      </li>
    )

    const facebookShareLink = (
      <li className="gallery-toolbox-action" key="fb-share" onClick={() => { this.share('fb') }}>
        <div className="toolbox-action-iconHolder">
          <FacebookButton url={url} appId="1401488693436528">
            <i className="fab fa-facebook-f"></i>
          </FacebookButton>
        </div>
      </li>
    )

    const twitterShareLink = (
      <li className="gallery-toolbox-action" key="twitter-share" onClick={() => { this.share('fb') }}>
        <div className="toolbox-action-iconHolder">
          <TwitterButton url={url}>
            <i className="fab fa-twitter"></i>
          </TwitterButton>
        </div>
      </li>
    )

    const shareList = [emailShareLink, facebookShareLink, twitterShareLink]

    return (
      <div className="gallery-shadowBox">
        <div className="shadowBox-close"><Link to={this.galleryLink()}><div dangerouslySetInnerHTML={{__html: CloseIcon}} /></Link></div>
        <div className="gallery-toolbox">
          <ul className="gallery-toolbox-actions">
            {shareList}
          </ul>
        </div>
        <Swipeable className="gallery-shadowBox-content" onSwipedLeft={this.goNext.bind(this)} onSwipedRight={this.goPrevious.bind(this)} onSwipedDown={this.exit.bind(this)}>
          <div className="gallery-shadowBox-loader loader"></div>
          <div className="gallery-shadowBox-media">
            {media}
          </div>
          {shadowboxShare}
          <div className="gallery-shadowBox-navigation">
            {previousLink}
            {nextLink}
          </div>
        </Swipeable>
      </div>
    )
  }
}

export default withRouter(ShadowBox)
