import React, { Component } from 'react'
import superagent from 'superagent'
import { Link } from 'react-router-dom'
import Fuse from 'fuse.js'

class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      galleries: [],
      searchInput: ''
    }
  }

  componentDidMount() {
    const gallerListUrl = 'https://v4-api.smilebooth.com/api/v4/folders/list-names-noauth'
    superagent.post(gallerListUrl).end((err, res) => {
      this.setState((prevState, props) => {
        return {galleries: this.uniqueGalleries(res.body)}
      })
    })
  }

  updateSearch(e) {
    this.setState({searchInput: e.target.value})
  }

  uniqueGalleries(galleries) {
    let galleryIdHash = {}
    for (let i=0; i < galleries.length; i++) {
      galleryIdHash[galleries[i].id] = galleries[i].name
    }
    const galleryIds = Object.keys(galleryIdHash)
    const galleryNames = Object.values(galleryIdHash)
    let uniqueGalleries = []
    for(let i = 0; i < galleryIds.length; i++)
      uniqueGalleries.push({id: galleryIds[i], name: galleryNames[i]})
    return uniqueGalleries
  }

  render() {
    let fuse = new Fuse(this.state.galleries, {keys: ['name']})
    let results = []
    if (this.state.searchInput)
      results = fuse.search(this.state.searchInput)
    else
      results = this.state.galleries

    const galleriesDom = results.map((gallery) => {
      return <li key={gallery.id}><Link to={`/gallery/${gallery.id}`}>{gallery.name}</Link></li>
    })
    return (
      <div id="indexPage">
        <header>
          <h1>Galleries</h1>
          <input type="text" placeholder="search" value={this.state.searchInput} onChange={this.updateSearch.bind(this)} />
        </header>
        <ul>
          {galleriesDom}
        </ul>
      </div>
    )
  }
}

export default Index
