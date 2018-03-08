import React, { Component } from 'react'
import './App.css'
import Masonry from 'masonry-layout'
import imagesLoaded from 'imagesloaded'
import $ from 'jquery'
import * as d3 from 'd3'
import moment from 'moment'
// import superagent from 'superagent'

class App extends Component {
  constructor(props) {
    super(props)
    const photosToLoad = 50
    let photos = this.makePhotosArray(photosToLoad)
    photos = this.sortPhotos(photos)
    const pixelVsTimeFunc = null
    const scrollDate = new Date()
    this.state = {photos, pixelVsTimeFunc, scrollDate}
  }

  componentDidMount() {
    setTimeout(() => {this.someCallThatAddsPhotos()}, 15000)
    console.log('scrolllisten')
    $(document).off()
    $(document).on('scroll', (e) => {
      if (this.state.pixelVsTimeFunc) {
        this.setState({scrollDate: this.state.pixelVsTimeFunc($(document).scrollTop())})
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('app update')
  }

  setPixelVsTimeFunc(pixelVsTimeFunc) {
    console.log('update scroll func')
    this.setState({pixelVsTimeFunc})
  }

  sortPhotos(photos) {
    photos.sort((a, b) => { return b.timestamp - a.timestamp })
    return photos
  }

  someCallThatAddsPhotos() {
    this.setState((prevState, props) => {
      return {photos: prevState.photos.concat(this.makePhotosArray(25))}
    })
  }


  makePhotosArray(numberToMake) {
    let photos = []
    for(let i = 0; i < numberToMake; i++) {
      const cachebust = Math.random().toString(36).substr(2, 5)
      photos.push({
        url: `https://thecatapi.com/api/images/get?cachebust=${cachebust}`,
        timestamp: new Date(Date.now() + ~~(Math.random() * 2000000))
      })
    }
    return photos
  }

  render() {
    return (
      <div>
        <h1 className="scrollDate">{moment(this.state.scrollDate).format('LT')}</h1>
        <Gallery photos={this.state.photos} setPixelVsTimeFunc={this.setPixelVsTimeFunc.bind(this)} />
      </div>
    )
  }
}

class Gallery extends Component {

  componentDidMount() {
    this.masonIt()
    this.functionIt()
    this.props.setPixelVsTimeFunc(this.createPixelTimeFunction())
  }

  componentDidUpdate() {
    this.masonIt()
  }

  functionIt() {
    var grid = document.querySelector('.gallery')
    imagesLoaded(grid).on('always', () => {
      this.props.setPixelVsTimeFunc(this.createPixelTimeFunction())
    })
  }

  createPixelTimeFunction() {
    let pixelVsTime = {}
    $('.gallery-galleryTile').each((i, tile) => {
      const intFromTop = parseInt(tile.style.top, 10)
      pixelVsTime[intFromTop] = this.props.photos[i].timestamp
    })
    const domain = Object.keys(pixelVsTime)
    const range = Object.values(pixelVsTime)
    const pixelVsTimeFunc = d3.scaleTime().domain(domain).range(range)
    return pixelVsTimeFunc
  }

  masonIt() {
    var grid = document.querySelector('.gallery')
    var masonry = new Masonry(grid, {
      itemSelector: '.gallery-galleryTile',
      columnWidth: '.gallery-columnSizer',
      percentPosition: true
    })
    imagesLoaded(grid).on('progress', () => {
      masonry.layout()
    })
  }

  render() {
    var galleryTiles = this.props.photos.map((photo) => {
      return (
        <GalleryTile src={photo.url} key={photo.url} />
      )
    })
    return (
      <div className="gallery">
        <div className="gallery-columnSizer"></div>
        {galleryTiles}
      </div>
    )
  }
}

class GalleryTile extends Component {
  render() {
    return (
      <div className="gallery-galleryTile">
        <Photo src={this.props.src} />
      </div>
    )
  }
}

class Photo extends Component {
  render() {
    return (
      <img src={this.props.src} alt="" />
    )
  }
}

export default App
