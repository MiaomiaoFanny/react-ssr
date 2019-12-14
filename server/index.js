/* eslint-disable react/jsx-filename-extension */
/* Docs:
  https://reacttraining.com/react-router/web/guides/server-rendering
 */
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from '../src/routes';
import App from '../src/App';
import { getServerStore } from '../src/store/store';

const store = getServerStore();
const app = express();
const { log: ll } = console;

app.use(express.static('public'));

app.get('*', (req, res) => {
  // 获取路由对应组件, 拿到组件的loadData方法, 执行loadData获取数据
  // inside a request
  const promises = [];
  // use `some` to imitate `<Switch>` behavior of selecting only
  // the first to match
  let theRoute;
  routes.some(route => {
    // 匹配路由
    const match = matchPath(req.path, route);
    if(match) {
      // 匹配到路由
      const { loadData } = route.component;
      if(loadData) {
        theRoute = route;
        promises.push(loadData(store));
      }
    }
    return match;
  });
  console.log('theRoute', theRoute);

  Promise.all(promises).then(() => {
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
        <script>
          // 将服务端获取的数据挂载到window上, 便于客户端渲染初始化store时使用
          window.__context = ${JSON.stringify(store.getState())}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `);
  });
});

app.listen(9000, () => {
  ll('Server start at http://localhost:9000');
});
