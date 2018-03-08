import React, { Component } from 'react'
import './App.css'
import Masonry from 'masonry-layout'
import imagesLoaded from 'imagesloaded'
import $ from 'jquery'
import * as d3 from 'd3'
import moment from 'moment'
// import superagent from 'superagent'

class App extends Component {
  render() {
    return (
      <div>
        <Gallery />
      </div>
    )
  }
}

class Gallery extends Component {

  constructor(props) {
    super(props)
    const photosToLoad = 50
    let photos = this.makePhotosArray(photosToLoad)
    photos = this.sortPhotos(photos)
    this.state = {photos}
  }

  componentDidMount() {
    // setTimeout(() => {this.someCallThatAddsPhotos()}, 15000)
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
      <div className="gallery">
        <GalleryControls photos={this.state.photos} />
        <GalleryTiles photos={this.state.photos} />
      </div>
    )
  }
}

class GalleryControls extends Component {
  render() {
    return (
      <div className="gallery-controls">
        <GalleryInfo photos={this.props.photos} />
        <GalleryTimeControl photos={this.props.photos} />
      </div>
    )
  }
}

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

class GalleryInfo extends Component {
  render() {
    return (
      <h1>{this.props.photos.length}</h1>
    )
  }
}

class GalleryTiles extends Component {
  componentDidMount() {
    this.masonIt()
  }

  componentDidUpdate() {
    this.masonIt()
  }

  masonIt() {
    var grid = document.querySelector('.gallery-images')
    var masonry = new Masonry(grid, {
      itemSelector: '.gallery-galleryTile',
      columnWidth: '.gallery-columnSizer',
      percentPosition: true
    })
    imagesLoaded(grid).on('progress', () => {
      masonry.layout()
    })
  }

  render () {
    var galleryTiles = this.props.photos.map((photo) => {return (<GalleryTile src={photo.url} key={photo.url} />)})
    return (
      <div className="gallery-images">
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
