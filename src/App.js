import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import superagent from 'superagent';

class App extends Component {
  constructor(props) {
    super(props);
    const photosToLoad = 20;
    const photos = this.makePhotosArray(photosToLoad);
    this.state = {photos};
  }

  // setTimeout(() => {
  //   this.setState((prevState, props) => {
  //     console.log('doin it');
  //     return {photos: prevState.photos.concat(this.makePhotosArray(25))};
  //   });
  // }, 10000)

  makePhotosArray(numberToMake) {
    let photos = [];
    for(let i = 0; i < numberToMake; i++) {
      const cachebust = Math.random().toString(36).substr(2, 5);
      photos.push({
        url: `https://thecatapi.com/api/images/get?cachebust=${cachebust}`,
        timestamp: ''
      });
    }
    return photos;
  }

  render() {
    return (
      <div>
        <Gallery photos={this.state.photos} />
      </div>
    );
  }
}

class Gallery extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    var grid = document.querySelector('.gallery');
    var masonry = new Masonry(grid, {
      itemSelector: '.gallery-galleryTile',
      columnWidth: '.gallery-columnSizer',
      percentPosition: true
    });
    imagesLoaded(grid).on('progress', () => {
      masonry.layout();
    });
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

export default App;
