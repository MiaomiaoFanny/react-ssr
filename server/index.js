import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import App from '../src/App'

const app = express()
const {log: ll} = console

app.use(express.static('public'))

app.get('/', (req, res) => {
  const content = renderToString(App)
  ll('content', content)
  res.send(`
  <html>
    <head>
      <meta charset="utf-8"/>
      <title>Fanny React SSR</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script src="/bundle.js"></script>
    </body>
  </html>
  `)
})

app.listen(9000, () => {
  ll('Server start at http://localhost:9000')
})
