import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import Gallery from './components/Gallery'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/smilebooth-gallery-react/gallery/:id" render={ ({ match }) => { return <Gallery galleryId={parseInt(match.params.id)} /> }} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
