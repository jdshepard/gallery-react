import React, { Component } from 'react'
import EmailShare from './EmailShare'
import MMSShare from './MMSShare'
import ShareLoading from './ShareLoading'

class ShadowboxShare extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      success: false,
      failure: false
    }
  }

  shareResponse(err, res) {
    this.setState({loading: false})
    if (err) {
      this.setState({failure: true})
    } else {
      this.setState({success: true})
    }
  }

  setLoading(loading) {
    this.setState({loading})
  }

  render() {
    let shareContent = null
    if(this.state.loading) {
      shareContent = <ShareLoading />
    } else if (this.state.success) {
      shareContent = <h2>Photo shared!</h2>
    } else if (this.state.failure) {
      shareContent = <h2>Could not complete your request :(</h2>
    } else if (this.props.shareType === 'email') {
      shareContent = <EmailShare shareResponse={this.shareResponse.bind(this)} photoDatum={this.props.photoDatum} setLoading={this.setLoading.bind(this)} />
    } else if (this.props.shareType === 'mms') {
      shareContent = <MMSShare shareResponse={this.shareResponse.bind(this)} photoDatum={this.props.photoDatum} setLoading={this.setLoading.bind(this)} />
    }
    return (
      <div>
        <div className="gallery-shadowBox-shareClose" onClick={() => { this.props.closeShare() }}></div>
        <div className="shadowBox-share">
          <div className="shadowBox-share-close" onClick={() => { this.props.closeShare() }}><i className="fas fa-times"></i></div>
          {shareContent}
        </div>
      </div>
    )
  }
}

export default ShadowboxShare
