import React, { Component } from 'react'
import superagent from 'superagent'

class MMSShare extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shareToPhone: ''
    }
  }

  updateShareform(e) {
    let phoneNumber = e.target.value
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
    this.setState({shareToPhone: phoneNumber})
  }

  submit(e) {
    e.preventDefault()
    this.props.setLoading(true)
    superagent.post('https://v4-api.smilebooth.com/api/v4/sharers/mms/share')
      .send({
        phone: this.state.shareToPhone,
        uploadId: `${this.props.photoDatum.id}`,
        galleryId: "3"
      })
      .end(this.props.shareResponse)
  }

  render() {
    return (
      <div>
        <header><h2>MMS</h2></header>
        <form onSubmit={this.submit.bind(this)}>
          <label>To Phone</label>
          <fieldset>
            <input name="toPhone" type="tel" placeholder="recipient phone number" value={this.state.shareToPhone} onChange={this.updateShareform.bind(this)} />
            </fieldset>
          <input type="submit" value="send!" />
        </form>
      </div>
    )
  }
}

export default MMSShare
