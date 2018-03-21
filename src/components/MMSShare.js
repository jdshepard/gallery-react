import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import superagent from 'superagent'

class MMSShare extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shareToPhone: '',
      shareToPhoneFormatted: ''
    }
  }

  updateShareform(values) {
    const {formattedValue, value} = values
    this.setState({shareToPhoneFormatted: formattedValue, shareToPhone: value})
    console.log(value)
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
            <NumberFormat name="toPhone" type="tel" placeholder="+1 (   )   -    " value={this.state.shareToPhoneFormatted} onValueChange={this.updateShareform.bind(this)} format="+1 (###)###-####" />
          </fieldset>
          <input type="submit" value="SEND" />
        </form>
      </div>
    )
  }
}

export default MMSShare
