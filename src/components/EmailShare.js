import React, { Component } from 'react'
import superagent from 'superagent'

class EmailShare extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shareToEmail: ''
    }
    console.log(this.props.photoDatum)
  }

  updateShareform(e) {
    this.setState({shareToEmail: e.target.value})
  }

  submit(e) {
    e.preventDefault()
    this.props.setLoading(true)
    superagent.post('https://v4-api.smilebooth.com/api/v4/sharers/email/share')
      .send({
        email: this.state.shareToEmail,
        uploadId: `${this.props.photoDatum.id}`,
        galleryId: "3"
      })
      .end(this.props.shareResponse)
  }

  render() {
    return (
      <div>
        <header><h2>Email</h2></header>
        <form onSubmit={this.submit.bind(this)}>
          <label>To Email</label>
          <fieldset>
            <input name="toEmail" type="email" placeholder="yeah@smilebooth.com" value={this.state.shareToEmail} onChange={this.updateShareform.bind(this)} />
            </fieldset>
          <input type="submit" value="SEND" />
        </form>
      </div>
    )
  }
}

export default EmailShare
