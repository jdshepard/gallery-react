import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Gallery from './Gallery'
import Index from './Index'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Index} />
        <Route path="/gallery/:id" render={ ({ match }) => { return <Gallery galleryId={parseInt(match.params.id, 10)} /> }} />
      </div>
    )
  }
}

export default App
