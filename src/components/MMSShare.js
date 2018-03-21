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
    this.setState({shareToPhone: e.target.value})
  }

  submit(e) {
    e.preventDefault()
    this.props.setLoading(true)
    superagent.post('https://v4-api.smilebooth.com/api/v4/sharers/email/share')
      .send({
        email: "jake.mchargue@gmail.com",
        uploadId: "17940",
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
            <input name="toPhone" type="text" placeholder="recipient phone number" value={this.state.shareToPhone} onChange={this.updateShareform.bind(this)} />
            </fieldset>
          <input type="submit" value="send!" />
        </form>
      </div>
    )
  }
}

export default MMSShare
