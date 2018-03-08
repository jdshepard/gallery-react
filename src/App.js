import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import superagent from 'superagent';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Gallery />
      </div>
    );
  }
}

class Gallery extends Component {

  constructor(props) {
    super(props)
    let photos = [];
    for(let i = 0; i < 25; i++)
      photos.push(`https://thecatapi.com/api/images/get?cachebust=${i}`);
    this.state = {photos};
  }

  componentDidMount() {
    var grid = document.querySelector('.gallery');
    var masonry = new Masonry(grid, {
      itemSelector: '.gallery-galleryTile',
      columnWidth: '.gallery-columnSizer',
      percentPosition: true
    });
    imagesLoaded(grid).on('done', () => {
      masonry.layout();
    });
  }

  render() {
    var galleryTiles = this.state.photos.map((src) => {
      return (
        <GalleryTile src={src} key={src} />
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
