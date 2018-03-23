import React, { Component } from 'react'
import superagent from 'superagent'
import { Link } from 'react-router-dom'

class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      galleries: []
    }
  }

  componentDidMount() {
    const gallerListUrl = 'https://test-api.smilebooth.com/api/v4/folders/list-names-noauth'
    superagent.post(gallerListUrl).end((err, res) => {
      this.setState((prevState, props) => {
        return {galleries: res.body}
      })
    })
  }

  render() {
    let galleryIdHash = {}
    for (let i=0; i < this.state.galleries.length; i++) {
      galleryIdHash[this.state.galleries[i].id] = this.state.galleries[i].name
    }
    const galleryIds = Object.keys(galleryIdHash)
    const galleryNames = Object.values(galleryIdHash)
    const galleriesDom = galleryIds.map((id, index) => {
      return <li key={id}><Link to={`/smilebooth-gallery-react/gallery/${id}`}>{galleryNames[index]}</Link></li>
    })
    return (
      <div>
        <h1>Galleries</h1>
        <ul>
          {galleriesDom}
        </ul>
      </div>
    )
  }
}

export default Index
