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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.photoData.length !== prevProps.photoData.length)
      this.setFunction()
  }

  setTime() {
  if (this.state.pixelVsTimeFunc) {
      this.setState({scrollDate: this.state.pixelVsTimeFunc($(document).scrollTop())})
    }
  }

  setFunction() {
    var grid = document.querySelector('.gallery')
    imagesLoaded(grid).on('always', () => {
      this.setState((prevState, props) => {
        return {pixelVsTimeFunc: this.createPixelTimeFunction()}
      }, this.setTime)
    })
  }

  createPixelTimeFunction() {
    let pixelVsTime = {}
    $('.gallery-galleryTile').each((i, tile) => {
      const intFromTop = parseInt($(tile).position().top, 10)
      pixelVsTime[intFromTop] = new Date(this.props.photoData[i].created)
    })
    const domain = Object.keys(pixelVsTime)
    const range = Object.values(pixelVsTime)
    const pixelVsTimeFunc = d3.scaleTime().domain(domain).range(range)
    return pixelVsTimeFunc
  }

  render() {
    let currentDate = 'loading'
    let currentTime = 'loading'
    if (this.state.scrollDate) {
      currentDate = moment(new Date(this.state.scrollDate)).format('M/D/YY')
      currentTime = moment(new Date(this.state.scrollDate)).format('hh:mm a')
    }
    return (
      <div>
        <span className="gallery-info gallery-info-date"><i className="fas fa-calendar-alt"></i><span className="gallery-info-datum">{currentDate}</span></span>
        <span className="gallery-info gallery-info-time"><i className="fas fa-clock"></i><span className="gallery-info-datum">{currentTime}</span></span>
      </div>
    )
  }
}

export default GalleryTimeControl
