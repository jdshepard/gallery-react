import React from 'react'
import ReactDOMServer from 'react-dom/server'

import App from '../../components/App'

const path = require("path")
const fs = require("fs")

export default (req, res, next) => {
  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html')
  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('err', err)
      return res.status(404).end()
    }

    // render the app as a string
    const html = ReactDOMServer.renderToString(<App />)

    // inject the rendered app into our html and send it
    return res.send(
      htmlData.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    )
  })
}
