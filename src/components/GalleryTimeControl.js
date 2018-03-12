import React, { Component } from 'react'
import imagesLoaded from 'imagesloaded'
import $ from 'jquery'
import * as d3 from 'd3'
import moment from 'moment'

class GalleryTimeControl extends Component {
  constructor(props) {
    super(props)
    this.state = {pixelVsTimeFunc: null, scrollDate: 'loading'}
  }

  componentDidMount() {
    this.setFunction()
    $(document).off()
    $(document).on('scroll', (e) => {
      this.setTime()
    })
  }

  setTime() {
  if (this.state.pixelVsTimeFunc) {
      this.setState({scrollDate: this.state.pixelVsTimeFunc($(document).scrollTop())})
    }
  }

  setFunction() {
    var grid = document.querySelector('.gallery')
    imagesLoaded(grid).on('always', () => {
      console.log('loaded')
      this.setState((prevState, props) => {
        console.log('set')
        return {pixelVsTimeFunc: this.createPixelTimeFunction()}
      }, this.setTime)
    })
  }

  createPixelTimeFunction() {
    let pixelVsTime = {}
    $('.gallery-galleryTile').each((i, tile) => {
      const intFromTop = parseInt($(tile).position().top, 10)
      pixelVsTime[intFromTop] = new Date(this.props.photoData[i].timestamp)
    })
    const domain = Object.keys(pixelVsTime)
    const range = Object.values(pixelVsTime)
    const pixelVsTimeFunc = d3.scaleTime().domain(domain).range(range)
    return pixelVsTimeFunc
  }

  render() {
    const currentMoment = moment(new Date(this.state.scrollDate))
    return (
      <div>
        <b>date</b>
        <p>{currentMoment.format('MMMM Do YYYY')}</p>
        <b>time</b>
        <p>{currentMoment.format('h:mm:ss a')}</p>
      </div>
    )
  }
}

export default GalleryTimeControl
