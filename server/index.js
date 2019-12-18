/* eslint-disable react/jsx-filename-extension */
/* Docs:
  https://reacttraining.com/react-router/web/guides/server-rendering
https://github.com/chimurai/http-proxy-middleware#options
 */
import httpProxyMiddleware from 'http-proxy-middleware';
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

Promise.allSettled = function(promises) {
  return new Promise((resolve, reject) => {
    let count = 0;
    const results = [];
    if(promises.length === 0) {
      return resolve(results);
    }
    promises.forEach((promise, i) => {
      promise.then(data => {
        results[i] = { status: 'resolved', data };
      }).catch((error) => {
        results[i] = { status: 'rejected', error };
      }).finally(() => {
        count += 1;
        ll(i, results[i].status);
        if(count === promises.length) {
          resolve(results);
        }
      });
    });
  });
};

const sendResult = (req, res) => {
    ll('sendResult.....');
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url}>
          {App}
        </StaticRouter>
      </Provider>
    );
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
};

app.use(
  '/api',
  httpProxyMiddleware({
    target: 'http://localhost:9090',
    changeOrigin: true,
    // ws: true,
    // pathRewrite: {'^/api': '/'}
  })
);
app.get('*', (req, res) => {
  console.log('>>>>>>>>', req.url, '<<<<<<<<<<');
  // 获取路由对应组件, 拿到组件的loadData方法, 执行loadData获取数据
  const promises = [];
  // some > every 匹配所有符合条件的路由
  routes.every(route => {
    const match = matchPath(req.path, route);
    ll('match', match, req.path, route);
    if(match) {
      // 匹配到路由
      const { loadData } = route.component;
      if(loadData) {
        promises.push(loadData(store));
      }
    }
    return match;
  });
  console.log('promises.length', promises.length);

  // 方法一: 无论是否发生错误均返回, 可以实现降级处理
  // 缺点: 任何一个reject会导致立即返回, 会导致还未resolve的promise被截断, 从而改成走client端渲染
  // Promise.all(promises)
  //   .finally(() => sendResult(req, res))
  //   .catch(() => res.send('501 Internal Error.')); // 处理finally里的异常

  // 方法二: 实现ES2010的 Promise.allSettled方法, 所有请求结束后才返回, 将结果每个promise的结果储存在results中
  Promise.allSettled(promises).then((results) => {
    console.log('results', results);
    sendResult(req, res);
  })
  .catch(() => res.send('501 Internal Error.')); // 处理之外的异常
});

app.listen(9000, () => {
  ll('Server start at http://localhost:9000');
});
