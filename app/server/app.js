import path from 'path'
import express from 'express'
import cors from 'cors'

import router from './router'

const app = express()

const assets = express.static(path.resolve('build'))

app.use(cors())
app.use(assets)

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
})

app.get('*', router)

export default app
