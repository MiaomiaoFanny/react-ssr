/* eslint-disable react/jsx-filename-extension */
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../src/App';
import store from '../src/store/store';

const app = express();
const { log: ll } = console;

app.use(express.static('public'));

app.get('*', (req, res) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        {App}
      </StaticRouter>
    </Provider>
  );
  ll('content', content);
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
  `);
});

app.listen(9000, () => {
  ll('Server start at http://localhost:9000');
});
