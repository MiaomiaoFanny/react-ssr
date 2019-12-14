// 模拟接口

const express = require('express');

const app = express();
const { log: ll } = console;

app.get('/api/course/list', (req, res) => {
  setTimeout(() => {
    res.json({
      code: 0,
      list: [
        { name: '吃饭', id: 1 },
        { name: '睡觉', id: 2 },
        { name: '打豆豆', id: 3 },
      ]
    });
  }, 2000);
});

app.get('/api/app/info', (req, res) => {
  res.json({
    code: 0,
    info: {
      name: 'React SSR learning',
    },
  });
});

app.listen(9090, () => {
  ll('Mock Server start at http://localhost:9090');
});
