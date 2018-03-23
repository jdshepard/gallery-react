import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import Gallery from './components/Gallery'
import Index from './components/Index'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/smilebooth-gallery-react" component={Index} />
          <Route path="/smilebooth-gallery-react/gallery/:id" render={ ({ match }) => { return <Gallery galleryId={parseInt(match.params.id, 10)} /> }} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
