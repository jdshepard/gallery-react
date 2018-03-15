import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Gallery from './components/Gallery'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Gallery />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
