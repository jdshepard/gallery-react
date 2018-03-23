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
    console.log('domain')
    console.log(domain)
    console.log('range')
    console.log(range)
    return pixelVsTimeFunc
  }

  render() {
    const currentMoment = moment(new Date(this.state.scrollDate))
    return (
      <div>
        <span className="gallery-info gallery-info-date"><i className="fas fa-calendar-alt"></i><span className="gallery-info-datum">{currentMoment.format('M/D/YY')}</span></span>
        <span className="gallery-info gallery-info-time"><i className="fas fa-clock"></i><span className="gallery-info-datum">{currentMoment.format('hh:mm a')}</span></span>
      </div>
    )
  }
}

export default GalleryTimeControl
