import { renderToString } from 'react-dom/server'
import React from 'react'
import { matchPath, StaticRouter } from 'react-router-dom'
import superagent from 'superagent'

import routes from './routes'
import renderFullPage from './renderFullPage'
// import getPokemon from '../services/getPokemon'
import App from '../components/App'

export default function router(req, res) {
  const match = routes.reduce((acc, route) => matchPath(req.url, { path: route, exact: true }) || acc, null)
  console.log(match)
  if (!match) {
    res.status(404).send('page not found')
    console.log('no matchy')
    return
  }

  if (match.params.galleryId && match.params.photoId) {
    superagent.post('https://v4-api.smilebooth.com/api/v4/images/list-by-gallery-noauth')
      .send({galleryId: match.params.galleryId})
      .end((err, response) => {
        const image = response.body.find((res_image) => { return parseInt(res_image.id, 10) === parseInt(match.params.photoId, 10) })
        if (image) {
          const header = `
            <meta property="fb:app_id" content="1401488693436528" />
            <meta property="og:type"   content="article" />
            <meta property="og:url"    content="${req.url}" />
            <meta property="og:title"  content="Smilebooth" />
            <meta property="og:image"  content="${image.cardUrl}" />

            <meta name="twitter:card" content="summary">
            <meta name="twitter:title" content="Smilebooth">
            <meta name="twitter:description" content="Smilebooth">
            <meta name="twitter:image" content="${image.cardUrl}">
          `
          res.status(200).send(renderFullPage(html, header))
          return
        } else {
          res.status(404).send("Image not found")
          return
        }
      })
  } else {
    res.status(200).send(renderFullPage(html, ''))
  }

  const html = renderToString(
    <StaticRouter context={{}} location={req.url}>
      <App />
    </StaticRouter>
  )

  // return getPokemon.withAbility('telepathy')
  //   .then(resp => {
  //     const pokemon = { list: resp.data.pokemon }
  //     const context = {}
  //     const html = renderToString(
  //       <StaticRouter context={context} location={req.url}>
  //         <App pokemon={pokemon} />
  //       </StaticRouter>
  //     )
  //     res.status(200).send(renderFullPage(html, pokemon))
  //   })
  //   .catch( err => res.status(404).send(`${err}: oh no error!`))
}
