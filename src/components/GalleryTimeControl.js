import React, { Component } from 'react'
import imagesLoaded from 'imagesloaded'
import $ from 'jquery'
import * as d3 from 'd3'

class GalleryTimeControl extends Component {
  componentDidMount() {
    // $(document).off()
    // $(document).on('scroll', (e) => {
    //   if (this.state.pixelVsTimeFunc) {
    //     this.setState({scrollDate: this.state.pixelVsTimeFunc($(document).scrollTop())})
    //   }
    // })
    // this.functionIt()
    // this.setPixelVsTimeFunc(this.createPixelTimeFunction())
  }

  functionIt() {
    var grid = document.querySelector('.gallery')
    imagesLoaded(grid).on('always', () => {
      this.setPixelVsTimeFunc(this.createPixelTimeFunction())
    })
  }

  createPixelTimeFunction() {
    let pixelVsTime = {}
    $('.gallery-galleryTile').each((i, tile) => {
      const intFromTop = parseInt(tile.style.top, 10)
      pixelVsTime[intFromTop] = this.state.photos[i].timestamp
    })
    const domain = Object.keys(pixelVsTime)
    const range = Object.values(pixelVsTime)
    const pixelVsTimeFunc = d3.scaleTime().domain(domain).range(range)
    return pixelVsTimeFunc
  }

  render() {
    return (
      <h1>time</h1>
    )
  }
}

export default GalleryTimeControl
