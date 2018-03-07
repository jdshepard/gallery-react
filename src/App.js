import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';

class App extends Component {
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
    this.state = {
      photos: ["/images/dave0.jpg","/images/dave1.jpg","/images/dave2.jpg","/images/dave3.jpg","/images/dave4.jpg","/images/dave5.jpg","/images/dave6.jpg","/images/dave7.jpg","/images/dave8.jpg","/images/dave9.jpg","/images/dave10.jpg","/images/dave11.jpg","/images/dave12.jpg","/images/dave13.jpg","/images/dave14.jpg","/images/dave15.jpg"]
    }
  }

  render() {
    var galleryTiles = this.state.photos.map((src) => {
      return (
        <GalleryTile src={src} key={src} />
      )
    })
    return (
      <div>
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
