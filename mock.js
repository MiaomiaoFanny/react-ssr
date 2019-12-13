// 模拟接口

const express = require('express');

const app = express();
const { log: ll } = console;

app.get('/api/course/list', (req, res) => {
  // 解决跨域
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.json({
    code: 0,
    list: [
      { name: '111', id: 1 },
      { name: '222', id: 2 },
      { name: '333', id: 3 },
      { name: '444', id: 4 },
      { name: '555', id: 5 },
    ]
  })
})

app.get('/api/app/info', (req, res) => {
  // 解决跨域
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.json({
    code: 0,
    info: {
      name: 'React SSR learning',
    },
  })
})

app.listen(9090, () => {
  ll('Mock Server start at http://localhost:9090');
});
