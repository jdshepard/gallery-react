import React, { Component } from 'react'

class Photo extends Component {
  render() {
    return (
      <img src={this.props.src} alt="" />
    )
  }
}

export default Photo
