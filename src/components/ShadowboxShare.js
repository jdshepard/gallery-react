import React, { Component } from 'react'
import EmailShare from './EmailShare'
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
    this.setLoading(false)
    if (err) {
      console.log('error')
    } else {
      console.log('success')
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
      shareContent = <h2>Success!</h2>
    } else if (this.state.failure) {
      shareContent = <h2>Could not complete your request :(</h2>
    } else {
      shareContent = <EmailShare shareResponse={this.shareResponse.bind(this)} setLoading={this.setLoading.bind(this)} />
    }
    return (
      <div>
        <div className="gallery-shadowBox-shareClose"></div>
        <div className="gallery-shadowBox-share">
          <div className="shadowBox-share-container">
            <div className="shadowBox-share">
              <div className="shadowBox-share-close" onClick={() => { this.props.closeShare() }}><i className="fas fa-times"></i></div>
              {shareContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShadowboxShare
