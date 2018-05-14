import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Gallery from './Gallery'
import Index from './Index'

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/:galleryId" component={Gallery} />
      </div>
    )
  }
}

export default App
